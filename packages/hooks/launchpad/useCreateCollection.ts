import keccak256 from "keccak256"; // Tested and this lib is compatible with merkle tree libs from Rust and Go
import { MerkleTree } from "merkletreejs";
import { useCallback } from "react";
import { useSelector } from "react-redux";

import { useFeedbacks } from "@/context/FeedbacksProvider";
import {
  MintPeriod,
  NftLaunchpadClient,
  WhitelistInfo,
} from "@/contracts-clients/nft-launchpad";
import { useCompleteCollection } from "@/hooks/launchpad/useCompleteCollection";
import { PinataFileProps, useIpfs } from "@/hooks/useIpfs";
import { useSelectedNetworkId } from "@/hooks/useSelectedNetwork";
import useSelectedWallet from "@/hooks/useSelectedWallet";
import { getNetworkFeature, NetworkFeature } from "@/networks";
import { getKeplrSigningCosmWasmClient } from "@/networks/signer";
import { selectNFTStorageAPI } from "@/store/slices/settings";
import { generateIpfsKey } from "@/utils/ipfs";
import { LocalFileData } from "@/utils/types/files";
import {
  CollectionAssetsMetadatasFormValues,
  CollectionFormValues,
  CollectionMintPeriodFormValues,
  CollectionToSubmit,
} from "@/utils/types/launchpad";

export const useCreateCollection = () => {
  // Since the Collection network is the selected network, we use useSelectedNetworkId (See LaunchpadBasic.tsx)
  const selectedNetworkId = useSelectedNetworkId();
  const selectedWallet = useSelectedWallet();
  const { setToast } = useFeedbacks();
  const userIPFSKey = useSelector(selectNFTStorageAPI);
  const { pinataPinFileToIPFS, uploadFilesToPinata } = useIpfs();
  const { completeCollection } = useCompleteCollection();

  const createCollection = useCallback(
    async (collectionFormValues: CollectionFormValues) => {
      if (!selectedWallet) return;
      const userId = selectedWallet.userId;
      const walletAddress = selectedWallet.address;

      const signingComswasmClient =
        await getKeplrSigningCosmWasmClient(selectedNetworkId);
      const cosmwasmLaunchpadFeature = getNetworkFeature(
        selectedNetworkId,
        NetworkFeature.NFTLaunchpad,
      );
      if (!cosmwasmLaunchpadFeature) return;

      const nftLaunchpadContractClient = new NftLaunchpadClient(
        signingComswasmClient,
        walletAddress,
        cosmwasmLaunchpadFeature.launchpadContractAddress,
      );
      const pinataJWTKey =
        collectionFormValues.assetsMetadatas?.nftApiKey ||
        userIPFSKey ||
        (await generateIpfsKey(selectedNetworkId, userId));
      if (!pinataJWTKey) {
        console.error("Project creation error: No Pinata JWT");
        setToast({
          mode: "normal",
          type: "error",
          title: "Project creation error: No Pinata JWT",
        });
        return;
      }

      try {
        // ========== Cover image
        const fileIpfsHash = await pinataPinFileToIPFS({
          pinataJWTKey,
          file: collectionFormValues.coverImage,
        } as PinataFileProps);
        if (!fileIpfsHash) {
          console.error("Project creation error: Pin to Pinata failed");
          setToast({
            mode: "normal",
            type: "error",
            title: "Project creation error: Pin to Pinata failed",
          });
          return;
        }

        // ========== Whitelists
        const whitelistAddressesFilesToUpload: LocalFileData[] = [];
        collectionFormValues.mintPeriods.forEach((mintPeriod) => {
          if (mintPeriod.whitelistAddressesFile)
            whitelistAddressesFilesToUpload.push(
              mintPeriod.whitelistAddressesFile,
            );
        });
        const remoteWhitelistAddressesFiles = await uploadFilesToPinata({
          pinataJWTKey,
          files: whitelistAddressesFilesToUpload,
        });
        const mint_periods: MintPeriod[] = collectionFormValues.mintPeriods.map(
          (mintPeriod: CollectionMintPeriodFormValues, index) => {
            let whitelist_info: WhitelistInfo | null = null;
            if (
              mintPeriod.whitelistAddresses?.length &&
              remoteWhitelistAddressesFiles[index].url
            ) {
              const addresses: string[] = mintPeriod.whitelistAddresses;
              const leaves = addresses.map(keccak256);
              const tree = new MerkleTree(leaves, keccak256);
              const merkleRoot = tree.getRoot().toString("hex");
              whitelist_info = {
                addresses_count: addresses.length,
                addresses_ipfs: remoteWhitelistAddressesFiles[index].url,
                addresses_merkle_root: merkleRoot,
              };
            }
            return {
              price: mintPeriod.price,
              end_time: mintPeriod.endTime,
              max_tokens: mintPeriod.maxTokens
                ? parseInt(mintPeriod.maxTokens, 10)
                : 0,
              limit_per_address: mintPeriod.perAddressLimit
                ? parseInt(mintPeriod.perAddressLimit, 10)
                : 0,
              start_time: mintPeriod.startTime,
              whitelist_info,
            };
          },
        );

        // ========== Final collection
        const collection: CollectionToSubmit = {
          name: collectionFormValues.name,
          desc: collectionFormValues.description,
          symbol: collectionFormValues.symbol,
          website_link: collectionFormValues.websiteLink,
          contact_email: collectionFormValues.email,
          project_type: collectionFormValues.projectTypes.join(),
          project_desc: collectionFormValues.projectDescription,
          tokens_count: parseInt(collectionFormValues.tokensCount, 10),
          reveal_time: collectionFormValues.revealTime,
          team_desc: collectionFormValues.teamDescription,
          partners: collectionFormValues.partnersDescription,
          investment_desc: collectionFormValues.investDescription,
          investment_link: collectionFormValues.investLink,
          artwork_desc: collectionFormValues.artworkDescription,
          expected_supply: parseInt(collectionFormValues.expectedSupply, 10),
          expected_public_mint_price: parseInt(
            collectionFormValues.expectedPublicMintPrice,
            10,
          ),
          expected_mint_date: collectionFormValues.expectedMintDate,
          cover_img_uri: "ipfs://" + fileIpfsHash,
          is_applied_previously: collectionFormValues.isPreviouslyApplied,
          is_project_derivative: collectionFormValues.isDerivativeProject,
          is_ready_for_mint: collectionFormValues.isReadyForMint,
          is_dox: collectionFormValues.isDox,
          escrow_mint_proceeds_period: parseInt(
            collectionFormValues.escrowMintProceedsPeriod,
            10,
          ),
          dao_whitelist_count: parseInt(
            collectionFormValues.daoWhitelistCount,
            10,
          ),
          mint_periods,
          royalty_address: collectionFormValues.royaltyAddress,
          royalty_percentage: collectionFormValues.royaltyPercentage
            ? parseInt(collectionFormValues.royaltyPercentage, 10)
            : null,
          target_network: selectedNetworkId,
        };
        const collectionId = collectionFormValues.symbol;

        // ========== Submit the collection through the contract
        const submitCollectionResult =
          await nftLaunchpadContractClient.submitCollection({
            collection,
          });

        // ========== Handle assets metadata
        const assetsMetadataFormsValues:
          | CollectionAssetsMetadatasFormValues
          | undefined = collectionFormValues.assetsMetadatas;

        if (!assetsMetadataFormsValues?.assetsMetadatas?.length) {
          setToast({
            mode: "normal",
            type: "success",
            title: "Project submitted (Incomplete)",
            message: "You will need to add Assets & Metadata",
          });
        } else {
          await completeCollection(collectionId, assetsMetadataFormsValues);

          setToast({
            mode: "normal",
            type: "success",
            title: "Project submitted",
          });
        }

        return { submitCollectionResult };
      } catch (e: any) {
        console.error("Error creating a NFT Collection in the Launchpad: ", e);
        setToast({
          mode: "normal",
          type: "error",
          title: "Error creating a NFT Collection in the Launchpad",
          message: e.message,
        });
      }
    },
    [
      pinataPinFileToIPFS,
      selectedWallet,
      userIPFSKey,
      uploadFilesToPinata,
      selectedNetworkId,
      setToast,
      completeCollection,
    ],
  );

  return {
    createCollection,
  };
};