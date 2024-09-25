import React from "react";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";

import { CenterSection } from "./component/CenterSection";
import { GameBgCard } from "./component/GameBgCard";
import { GameBgOverlay } from "./component/GameBgOverlay";
import { RiotGameHeader } from "./component/RiotGameHeader";

import { Metadata } from "@/api/launchpad/v1/launchpad";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { FileUploader } from "@/components/inputs/FileUploader";
import { useAppNavigation } from "@/hooks/navigation/useAppNavigation";
import { useSelectedNetworkId } from "@/hooks/useSelectedNetwork";
import useSelectedWallet from "@/hooks/useSelectedWallet";
import { mustGetLaunchpadClient } from "@/utils/backend";
import { gameBgData } from "@/utils/game";
import { IMAGE_MIME_TYPES } from "@/utils/mime";
import { neutral00 } from "@/utils/style/colors";
import { headerHeight } from "@/utils/style/layout";
import { LocalFileData } from "@/utils/types/files";

export const RiotGameScreen = () => {
  const navigation = useAppNavigation();
  const networkId = useSelectedNetworkId();
  const selectedWallet = useSelectedWallet();

  const { width, height } = useWindowDimensions();
  const cardSize = {
    height: (height - headerHeight) / 5,
    width: width / 10,
  };

  const gotoEnroll = () => {
    navigation.navigate("RiotGameEnroll");
  };

  // const updateWhitelists = async () => {
  //   const client = mustGetLaunchpadClient(networkId);
  //   const whitelists: WhitelistMintInfo[] = [
  //     {
  //       addresses: ["addr1", "addr2", "addr3", "addr4", "add5"],
  //       unitPrice: 1_000_000,
  //       denom: "utori",
  //       limitPerAddress: 2,
  //       addressesCount: 5,
  //       startTime: Date.now(),
  //       endTime: Date.now(),
  //     },
  //     {
  //       addresses: ["address2"],
  //       unitPrice: 2_000_000,
  //       denom: "utori",
  //       limitPerAddress: 2,
  //       addressesCount: 1,
  //       startTime: Date.now(),
  //       endTime: Date.now(),
  //     },
  //   ];

  //   const res = await client.UpdateCollectionWhitelists({
  //     sender: selectedWallet?.address,
  //     networkId,
  //     projectId: 1,
  //     whitelistMintInfos: whitelists,
  //   });
  //   console.log(res);
  // };

  const uploadMetadatas = async () => {
    const client = mustGetLaunchpadClient(networkId);

    const nft0 = {
      image: "image0",
      imageData: "",
      externalUrl: "",
      description: "",
      name: "nft #0",
      attributes: [
        { traitType: "type0", value: "value0" },
        { traitType: "type1", value: "value1" },
      ],
      backgroundColor: "",
      animationUrl: "",
      youtubeUrl: "",
      royaltyPercentage: 0,
      royaltyPaymentAddress: "",
    };

    const nft1 = {
      image: "image1",
      imageData: "",
      externalUrl: "",
      description: "",
      name: "nft #1",
      attributes: [{ traitType: "type1", value: "value1" }],
      backgroundColor: "",
      animationUrl: "",
      youtubeUrl: "",
      royaltyPercentage: 5,
      royaltyPaymentAddress: "",
    };

    const metadatas: Metadata[] = [nft0, nft1];

    const resp = await client.UploadMetadatas({
      sender: selectedWallet?.address,
      projectId: "TORI",
      networkId,
      metadatas,
    });
    console.log(resp);
  };

  const getTokenMetadata = async () => {
    const client = mustGetLaunchpadClient(networkId);
    const resp = await client.TokenMetadata({
      sender: selectedWallet?.address,
      projectId: "TORI",
      networkId,
      tokenId: 1,
    });
    console.log(resp);
  };

  const uploadMetadata = async (data: LocalFileData[]) => {
    const client = mustGetLaunchpadClient(networkId);

    const nft0 = {
      image: "image0",
      imageData: "",
      externalUrl: "",
      description: "",
      name: "nft #0",
      attributes: [
        { traitType: "type0", value: "value0" },
        { traitType: "type1", value: "value1" },
      ],
      backgroundColor: "",
      animationUrl: "",
      youtubeUrl: "",
      royaltyPercentage: 0,
      royaltyPaymentAddress: "",
    };

    console.log("==================before");
    const resp = await client.UploadMetadatas({
      sender: selectedWallet?.address || "",
      networkId,
      projectId: "TORI",
      metadatas: [nft0],
    });
    console.log(resp);
  };

  return (
    <View style={styles.container}>
      <RiotGameHeader hideMenu />

      <PrimaryButton text="Update tokens metadatas" onPress={uploadMetadatas} />
      <PrimaryButton text="Get token metadata" onPress={getTokenMetadata} />
      {/* <PrimaryButton text="Update whitelists" onPress={updateWhitelists} /> */}

      <FileUploader onUpload={uploadMetadata} mimeTypes={IMAGE_MIME_TYPES}>
        {({ onPress }) => (
          <PrimaryButton text="Upload metadata" onPress={onPress} />
        )}
      </FileUploader>

      <View style={styles.positionRelative}>
        <FlatList
          data={gameBgData}
          numColumns={10}
          extraData={{ width, height }}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <GameBgCard
              width={cardSize.width}
              height={cardSize.height}
              hidePlus={index < 10}
              item={item}
            />
          )}
        />
        <CenterSection
          onPress={gotoEnroll}
          cardWidth={cardSize.width}
          cardHeight={cardSize.height}
        />
        <GameBgOverlay type="top" />
        <GameBgOverlay type="bottom" />
        <GameBgOverlay type="left" />
        <GameBgOverlay type="right" />
      </View>
    </View>
  );
};

// FIXME: remove StyleSheet.create
// eslint-disable-next-line no-restricted-syntax
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: neutral00,
  },
  positionRelative: {
    flex: 1,
    position: "relative",
  },
});
