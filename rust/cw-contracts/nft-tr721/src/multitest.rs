use cosmwasm_std::{coin, Addr, Attribute, Coin, HexBinary, Uint128};
use cw2981_royalties::Metadata;
use cw721::{Approval, ContractInfoResponse};
use rs_merkle::{Hasher, MerkleProof, MerkleTree};
use sylvia::multitest::App;

use crate::{
    contract::{
        sv::multitest_utils::CodeId, ContractVersion, MintInfo, MintPeriod, WhitelistInfo,
        WhitelistProof,
    },
    error::ContractError,
    hasher::TrKeccak256,
    test_helpers::{
        assert_wasm_attr, get_default_mint_info, get_default_nfts, get_default_periods,
        get_merkle_tree_info, DEFAULT_BLOCK_TIME, METADATAS_MERKLE_ROOT,
    },
    utils::proto_encode,
};

const ADMIN: &str = "admin_user";
const CREATOR: &str = "creator_user";
const MINTER: &str = "minter_user";
const OWNER: &str = "owner_user";
const OPERATOR: &str = "operator_user";
const UNAUTHOR: &str = "unauthor_user";
const ROYALTY_ADDR: &str = "royalty_addr";

// Generated by merke root later in the code
const FIRST_TOKEN_ID: &str = "1";

#[test]
fn full_flow() {
    // 1. Create
    let app: App<sylvia::cw_multi_test::App> = App::default();

    app.app_mut()
        .init_modules(|router, _, storage| {
            router.bank.init_balance(
                storage,
                &Addr::unchecked(OWNER.to_string()),
                vec![coin(1000000, "utori"), coin(1000000, "uinvalid")],
            )?;
            Ok::<(), sylvia::anyhow::Error>(())
        })
        .unwrap();

    // Instantiate NFT contract ---------------------------------------------------------
    let mint_info = get_default_mint_info();
    let mint_periods = get_default_periods();
    let contract = CodeId::store_code(&app)
        .instantiate(
            ADMIN.to_string(),
            "NFT name".to_string(),
            MINTER.to_string(),
            "SYMBOL".to_string(),
            "launchpad_contract".to_string(),
            mint_info,
            mint_periods,
        )
        .call(CREATOR)
        .unwrap();

    // Query minter
    {
        let resp = contract.minter().unwrap();
        assert_eq!(resp.minter, Some(MINTER.to_string()));
    }

    // Query contract info
    {
        let resp = contract.contract_info().unwrap();
        assert_eq!(
            resp,
            ContractInfoResponse {
                name: "NFT name".to_string(),
                symbol: "SYMBOL".to_string()
            }
        );
    }

    // Query mint info
    {
        let resp = contract.mint_info().unwrap();
        assert_eq!(resp.tokens_count, 4);
        assert_eq!(
            resp.metadatas_merkle_root,
            METADATAS_MERKLE_ROOT.to_string()
        );
    }

    // Query periods
    {
        let resp = contract.mint_periods().unwrap();
        assert_eq!(resp, get_default_periods());
    }

    // Mint NFT with metadata onchain + royalty address and query NFT info
    {
        let token_id = FIRST_TOKEN_ID.to_string();
        let owner = OWNER.to_string();
        let token_uri = Some("token_uri".to_string());
        let extention = Some(Metadata {
            name: Some("this is NFT name".to_string()),
            royalty_payment_address: Some(ROYALTY_ADDR.to_string()),
            royalty_percentage: Some(5), // royalty 5%

            ..Metadata::default()
        });
        contract
            .mint(token_id, owner, token_uri, extention)
            .call(MINTER)
            .unwrap();

        let resp = contract.nft_info(FIRST_TOKEN_ID.to_string()).unwrap();
        let ext = resp.extension.unwrap();

        assert_eq!(ext.name, Some("this is NFT name".to_string()));
        assert_eq!(ext.royalty_payment_address, Some(ROYALTY_ADDR.to_string()));

        // Query balance
    }

    // Query All NFT info
    {
        let resp = contract
            .all_nft_info(FIRST_TOKEN_ID.to_string(), Some(true))
            .unwrap();
        assert_eq!(resp.info.token_uri, Some("token_uri".to_string()));
    }

    // Query owner of
    {
        let resp = contract
            .owner_of(FIRST_TOKEN_ID.to_string(), Some(true))
            .unwrap();
        assert_eq!(resp.owner, OWNER.to_string());
    }

    // Approve
    {
        let resp = contract
            .approve(OPERATOR.to_string(), FIRST_TOKEN_ID.to_string(), None)
            .call(OWNER)
            .unwrap();

        assert_wasm_attr(
            resp,
            Attribute {
                key: "spender".to_string(),
                value: OPERATOR.to_string(),
            },
        );
    }

    // Approve all
    {
        let resp = contract
            .approve_all(OPERATOR.to_string(), None)
            .call(OWNER)
            .unwrap();

        assert_wasm_attr(
            resp,
            Attribute {
                key: "operator".to_string(),
                value: OPERATOR.to_string(),
            },
        );
    }

    // Query operator
    {
        let resp = contract
            .operator(OWNER.to_string(), OPERATOR.to_string(), Some(false))
            .unwrap();
        assert_eq!(
            resp.approval,
            Approval {
                spender: OPERATOR.to_string(),
                expires: cw721::Expiration::Never {}
            }
        )
    }

    // Check royalties
    {
        let resp = contract.check_royalties().unwrap();
        assert_eq!(resp.royalty_payments, true)
    }

    // Query royalties info
    {
        let resp = contract
            .royalty_info(FIRST_TOKEN_ID.to_string(), Uint128::new(1000))
            .unwrap();
        assert_eq!(resp.royalty_amount, Uint128::new(50))
    }

    // Query contract version
    {
        let resp = contract.contract_version().unwrap();
        assert_eq!(
            resp,
            ContractVersion {
                contract: "teritori:nft-tr721".to_string(),
                version: "0.2.0".to_string()
            }
        )
    }

    // Update mint info with unauthorized user
    {
        let mint_info = MintInfo::default();
        let err = contract
            .update_mint_info(mint_info)
            .call(UNAUTHOR)
            .unwrap_err();
        assert_eq!(err, ContractError::Unauthorized);
    }

    // Request mint: Error if reached max tokens
    {
        contract
            .update_mint_info(MintInfo::default())
            .call(ADMIN)
            .unwrap();

        assert_eq!(
            contract.request_mint(0, None).call(OWNER).unwrap_err(),
            ContractError::MintExceedMaxTokens
        );
    }

    // Request mint: Error period does not exist
    {
        contract
            .update_mint_info(MintInfo {
                tokens_count: 10,
                ..MintInfo::default()
            })
            .call(ADMIN)
            .unwrap();

        assert_eq!(
            contract.request_mint(5, None).call(OWNER).unwrap_err(),
            ContractError::InvalidPeriod
        );
    }

    // Request mint:
    // - Mint not started
    // => ContractError::MintNotStarted
    {
        contract
            .update_mint_period(
                0,
                MintPeriod {
                    start_time: DEFAULT_BLOCK_TIME + 10,
                    ..MintPeriod::default()
                },
            )
            .call(ADMIN)
            .unwrap();

        assert_eq!(
            contract.request_mint(0, None).call(OWNER).unwrap_err(),
            ContractError::MintNotStarted
        );
    }

    // Request mint:
    // - Mint ended
    // => ContractError::MintEnded
    {
        contract
            .update_mint_period(
                0,
                MintPeriod {
                    start_time: DEFAULT_BLOCK_TIME - 10,
                    end_time: Some(DEFAULT_BLOCK_TIME - 5),
                    ..MintPeriod::default()
                },
            )
            .call(ADMIN)
            .unwrap();

        assert_eq!(
            contract.request_mint(0, None).call(OWNER).unwrap_err(),
            ContractError::MintEnded
        );
    }

    // Request mint:
    // - Mint started
    // - Merkle root not provided => ContractError::MintWhitelistOnly
    // - Merkle provided but address not in whitelist => ContractError::MintNotWhitelisted
    {
        contract
            .update_mint_period(
                0,
                MintPeriod {
                    start_time: DEFAULT_BLOCK_TIME - 10,
                    ..MintPeriod::default()
                },
            )
            .call(ADMIN)
            .unwrap();

        let (root_hex, proof_hex) = get_merkle_tree_info(vec![OWNER], 0);

        contract
            .update_mint_period(
                0,
                MintPeriod {
                    whitelist_info: Some(WhitelistInfo {
                        addresses_merkle_root: root_hex,
                        addresses_count: 1,
                        addresses_ipfs: "".to_string(),
                    }),
                    ..MintPeriod::default()
                },
            )
            .call(ADMIN)
            .unwrap();

        // Not provide whitelist proof
        assert_eq!(
            contract.request_mint(0, None).call(OWNER).unwrap_err(),
            ContractError::MintWhitelistOnly
        );

        // Address not match with proof
        assert_eq!(
            contract
                .request_mint(
                    0,
                    Some(WhitelistProof {
                        merkle_proof: proof_hex.to_string(),
                        address_indice: 0
                    })
                )
                .call(UNAUTHOR)
                .unwrap_err(),
            ContractError::MintNotWhitelisted
        );
    }

    // Request mint:
    // - In period
    // - In whitelist
    // - Reach max token per period
    // => ContractError::MintExceedMaxPerPeriod
    {
        let (_, proof_hex) = get_merkle_tree_info(vec![OWNER], 0);

        contract
            .update_mint_period(
                0,
                MintPeriod {
                    start_time: DEFAULT_BLOCK_TIME - 10,
                    max_tokens: Some(0),
                    ..MintPeriod::default()
                },
            )
            .call(ADMIN)
            .unwrap();

        assert_eq!(
            contract
                .request_mint(
                    0,
                    Some(WhitelistProof {
                        merkle_proof: proof_hex.to_string(),
                        address_indice: 0
                    })
                )
                .call(OWNER)
                .unwrap_err(),
            ContractError::MintExceedMaxPerPeriod
        );
    }

    // Request mint:
    // - Mint not started
    // - In whitelist time and in whitelist
    // - Not Reach max per whitelist user
    //
    // => Not send fund: ContractError::InvalidFund
    // => Not send valid denom: ContractError::InvalidDenom
    // => Not send valid amount: ContractError::InvalidAmount
    {
        let (root_hex, proof_hex) =
            get_merkle_tree_info(vec!["addr0", "addr1", "addr2", "addr3", "addr4", OWNER], 5);
        contract
            .update_mint_period(
                0,
                MintPeriod {
                    max_tokens: None,
                    limit_per_address: Some(1),
                    price: Some(Coin {
                        amount: Uint128::new(10),
                        denom: "utori".to_string(),
                    }),
                    start_time: DEFAULT_BLOCK_TIME - 10,
                    end_time: Some(DEFAULT_BLOCK_TIME + 10),
                    whitelist_info: Some(WhitelistInfo {
                        addresses_count: 6,
                        addresses_merkle_root: root_hex,
                        addresses_ipfs: "ipfs".to_string(),
                    }),
                    ..MintPeriod::default()
                },
            )
            .call(ADMIN)
            .unwrap();

        let whitelist_proof = Some(WhitelistProof {
            merkle_proof: proof_hex,
            address_indice: 5,
        });

        assert_eq!(
            contract
                .request_mint(0, whitelist_proof.to_owned())
                .call(OWNER)
                .unwrap_err(),
            ContractError::InvalidFund
        );

        assert_eq!(
            contract
                .request_mint(0, whitelist_proof.to_owned())
                .with_funds(&[coin(10, "uinvalid")])
                .call(OWNER)
                .unwrap_err(),
            ContractError::InvalidDenom
        );

        assert_eq!(
            contract
                .request_mint(0, whitelist_proof.to_owned())
                .with_funds(&[coin(1, "utori")])
                .call(OWNER)
                .unwrap_err(),
            ContractError::InvalidAmount
        );
    }

    // Request mint: with the mint/whitelist info in previous step
    // but with correct fund this time => mint successfully
    {
        let (_, proof_hex) =
            get_merkle_tree_info(vec!["addr0", "addr1", "addr2", "addr3", "addr4", OWNER], 5);
        let whitelist_proof = Some(WhitelistProof {
            merkle_proof: proof_hex,
            address_indice: 5,
        });
        let resp = contract
            .request_mint(0, whitelist_proof.to_owned())
            .with_funds(&[coin(10, "utori")])
            .call(OWNER)
            .unwrap();

        assert_wasm_attr(
            resp.to_owned(),
            Attribute {
                key: "token_id".to_string(),
                value: "2".to_string(),
            },
        );

        let total_minted = contract.total_minted().unwrap();
        assert_eq!(total_minted, 2); // We have already minted by minter previously

        let minted_by_user = contract.minted_count_by_user(0, OWNER.to_string()).unwrap();
        assert_eq!(minted_by_user, 1);

        let minted_by_user = contract.minted_count_by_user(5, OWNER.to_string()).unwrap();
        assert_eq!(minted_by_user, 0);

        // - Reached max token per user
        // => ContractError::MintExceedMaxPerUser
        assert_eq!(
            contract
                .request_mint(0, whitelist_proof)
                .call(OWNER)
                .unwrap_err(),
            ContractError::MintExceedMaxPerUser
        );
    }

    // Request mint: normal mint without whitelist
    // - Not Reached max token per user
    // - Send correct fund
    // => success
    {
        contract
            .update_mint_period(
                1,
                MintPeriod {
                    start_time: DEFAULT_BLOCK_TIME - 10,
                    price: Some(Coin {
                        amount: Uint128::new(10),
                        denom: "utori".to_string(),
                    }),
                    whitelist_info: None,
                    ..MintPeriod::default()
                },
            )
            .call(ADMIN)
            .unwrap();

        let resp = contract
            .request_mint(1, None)
            .with_funds(&[coin(10, "utori")])
            .call(OWNER)
            .unwrap();

        assert_wasm_attr(
            resp,
            Attribute {
                key: "token_id".to_string(),
                value: "3".to_string(),
            },
        );

        let total_minted = contract.total_minted().unwrap();
        assert_eq!(total_minted, 3);

        let minted_by_user = contract.minted_count_by_user(1, OWNER.to_string()).unwrap();
        assert_eq!(minted_by_user, 1);

        let total_minted_by_user = contract
            .total_minted_count_by_user(OWNER.to_string())
            .unwrap();
        assert_eq!(total_minted_by_user, 2);
    }

    // Free mint period
    {
        contract
            .update_mint_period(
                2,
                MintPeriod {
                    start_time: DEFAULT_BLOCK_TIME - 10,
                    ..MintPeriod::default()
                },
            )
            .call(ADMIN)
            .unwrap();

        contract.request_mint(2, None).call(OWNER).unwrap();

        let total_minted = contract.total_minted().unwrap();
        assert_eq!(total_minted, 4);

        let minted_by_user = contract.minted_count_by_user(1, OWNER.to_string()).unwrap();
        assert_eq!(minted_by_user, 1);

        let total_minted_by_user = contract
            .total_minted_count_by_user(OWNER.to_string())
            .unwrap();
        assert_eq!(total_minted_by_user, 3);
    }

    // Query merke root
    {
        contract
            .update_mint_info(get_default_mint_info())
            .call(ADMIN)
            .unwrap();

        let resp = contract.merkle_root().unwrap();
        assert_eq!(resp, METADATAS_MERKLE_ROOT.to_string())
    }

    // Test merkle tree
    {
        let leaf_values = ["addr1", "addr2", "addr3", "addr4", "add5"];
        let leaves: Vec<[u8; 32]> = leaf_values
            .iter()
            .map(|x| TrKeccak256::hash(x.as_bytes()))
            .collect();

        let idx = 1;

        let merkle_tree = MerkleTree::<TrKeccak256>::from_leaves(&leaves);

        let leaf_indices = vec![idx];
        let leaf_hashes = leaves.get(idx..idx + 1).unwrap();

        let merkle_proof = merkle_tree.proof(&leaf_indices);

        let merkle_root = merkle_tree.root().unwrap();

        let proof_bytes = merkle_proof.to_bytes();
        let proof_hex = HexBinary::from(proof_bytes.to_owned()).to_string();
        let proof_bytes_from_hex = HexBinary::from_hex(&proof_hex).unwrap().to_vec();

        let proof = MerkleProof::<TrKeccak256>::try_from(proof_bytes_from_hex.to_owned()).unwrap();

        let is_ok = proof.verify(merkle_root, &leaf_indices, leaf_hashes, leaves.len());
        assert!(is_ok);

        let root_hex = HexBinary::from(merkle_root).to_string();
        let root_from_hex: [u8; 32] = HexBinary::from_hex(root_hex.as_str())
            .unwrap()
            .to_vec()
            .try_into()
            .unwrap();

        assert!(merkle_root == root_from_hex);
        // panic!("hex: {}, proof_hex: {}, root from hex: {:X?}, Is OK: {}, Root: {:X?}, Is equal: {}", root_hex, proof_hex, root_from_hex, is_ok, merkle_root, merkle_root == root_from_hex);
    }

    // Test mint with merkle path
    {
        let nfts = get_default_nfts();
        let nft2 = &nfts[2];
        let nft_hashes: Vec<[u8; 32]> = nfts
            .iter()
            .map(|x| TrKeccak256::hash(&proto_encode(x)))
            .collect();

        let merkle_tree = MerkleTree::<TrKeccak256>::from_leaves(&nft_hashes);
        let merkle_root = merkle_tree.root().unwrap();
        let root_hex = HexBinary::from(merkle_root).to_string();

        assert_eq!(root_hex, METADATAS_MERKLE_ROOT.to_string());

        // Try to claim un-requested token
        let not_requested_err = contract
            .claim(
                "inexist".to_string(),
                Metadata::default(),
                "merkle_proof".to_string(),
            )
            .call(OWNER)
            .unwrap_err();
        assert_eq!(not_requested_err, ContractError::NftNotRequested);

        // Claim a registed token from unauthorized user
        let unauthor_claim_err = contract
            .claim(
                "2".to_string(),
                Metadata::default(),
                "merkle_proof".to_string(),
            )
            .call(UNAUTHOR)
            .unwrap_err();
        assert_eq!(unauthor_claim_err, ContractError::Unauthorized);

        // Claim registered token from correct owner => should be successull
        let leaf_indices = vec![2];
        let merkle_proof = merkle_tree.proof(&leaf_indices);
        let proof_bytes = merkle_proof.to_bytes();
        let proof_hex = HexBinary::from(proof_bytes.to_owned()).to_string();

        let resp = contract
            .claim("2".to_string(), nft2.clone(), proof_hex)
            .call(OWNER)
            .unwrap();

        assert_wasm_attr(
            resp.clone(),
            Attribute {
                key: "action".to_string(),
                value: "claim".to_string(),
            },
        );
        assert_wasm_attr(
            resp.clone(),
            Attribute {
                key: "token_id".to_string(),
                value: "2".to_string(),
            },
        );

        // At this step, token should exist and mint
        let resp = contract.nft_info("2".to_string()).unwrap();
        assert_eq!(resp.token_uri, None);
        assert_eq!(resp.extension.unwrap().name, nft2.name);
    }
}
