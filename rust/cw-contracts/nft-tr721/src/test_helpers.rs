use cosmwasm_std::{Addr, Attribute, Uint128};
use cw2981_royalties::{Metadata, Trait};
use sylvia::cw_multi_test::AppResponse;

use crate::contract::{MintInfo, WhitelistMintInfo};

pub const MERKLE_ROOT: &str = "0110bb1a773c10cce02033f0594eda56df7b9ca30137520327b804107b252001";
pub const WHITELIST_USER: &str = "whitelist_user";
pub const DEFAULT_BLOCK_TIME: u64 = 1_571_797_419;

pub fn get_default_nfts() -> Vec<Metadata> {
    let nft0 = Metadata {
        name: Some("nft #0".to_string()),
        image: Some("image0".to_string()),
        attributes: Some(vec![
            Trait {
                display_type: None,
                trait_type: "type0".to_string(),
                value: "value0".to_string(),
            },
            Trait {
                display_type: None,
                trait_type: "type1".to_string(),
                value: "value1".to_string(),
            },
        ]),
        royalty_percentage: Some(9),
        ..Metadata::default()
    };
    let nft1 = Metadata {
        name: Some("nft #1".to_string()),
        image: Some("image1".to_string()),
        attributes: Some(vec![Trait {
            display_type: None,
            trait_type: "type1".to_string(),
            value: "value1".to_string(),
        }]),
        royalty_percentage: Some(5),
        ..Metadata::default()
    };
    let nft2 = Metadata {
        name: Some("nft #2".to_string()),
        image: Some("image2".to_string()),
        attributes: Some(vec![Trait {
            display_type: Some("attr2".to_string()),
            trait_type: "type2".to_string(),
            value: "value2".to_string(),
        }]),
        ..Metadata::default()
    };
    let nft3 = Metadata {
        name: Some("nft #3".to_string()),
        image: Some("image3".to_string()),
        attributes: Some(vec![Trait {
            display_type: Some("attr3".to_string()),
            trait_type: "type3".to_string(),
            value: "value3".to_string(),
        }]),
        ..Metadata::default()
    };

    vec![nft0, nft1, nft2, nft3]
}

pub fn get_default_whitelist_mint_info() -> WhitelistMintInfo {
    WhitelistMintInfo {
        addresses: vec![WHITELIST_USER.to_string()],
        unit_price: Uint128::new(1),
        denom: "denom".to_string(),
        limit_per_address: 2,
        member_limit: 1,
        start_time: DEFAULT_BLOCK_TIME,
        end_time: DEFAULT_BLOCK_TIME,
    }
}

pub fn get_default_whitelist_mint_infos() -> Vec<WhitelistMintInfo> {
    vec![]
}

pub fn get_default_mint_info() -> MintInfo {
    MintInfo {
        // Minting details ----------------------------
        tokens_count: get_default_nfts().len().try_into().unwrap(),
        unit_price: Uint128::new(2),
        denom: "denom".to_string(),
        limit_per_address: 2,
        start_time: DEFAULT_BLOCK_TIME - 10,

        // Royalty --------------------------
        royalty_address: Some(Addr::unchecked("royalty_address")),
        royalty_percentage: Some(50),

        // Extend info --------------------------
        merkle_root: MERKLE_ROOT.to_string(),
    }
}

pub fn has_attr(given_attrs: &Vec<Attribute>, expected_attr: &Attribute) -> bool {
    let resp = given_attrs
        .iter()
        .find(|item| item.key == expected_attr.key && item.value == expected_attr.value);
    resp.is_some()
}

pub fn assert_wasm_attr(resp: AppResponse, expected_attr: Attribute) {
    // app.events[0]: exec events
    // app.events[1]: wasm events
    let wasm_attrs = &resp.events[1].attributes;

    if !has_attr(wasm_attrs, &expected_attr) {
        panic!(
            "Attribute not found. Wasm attrs: {:?} - Expected attr: {:?}",
            wasm_attrs, expected_attr
        )
    }
}