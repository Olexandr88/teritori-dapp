import React, { useState, useEffect } from "react";
import { View } from "react-native";

import { TeritoriSellerQueryClient } from "../../../contracts-clients/teritori-freelance/TeritoriSeller.client";
import { useSelectedNetworkId } from "../../../hooks/useSelectedNetwork";
import useSelectedWallet from "../../../hooks/useSelectedWallet";
import {
  mustGetNonSigningCosmWasmClient,
  mustGetCosmosNetwork,
} from "../../../networks";
import { useAppNavigation } from "../../../utils/navigation";
import { fontSemibold28 } from "../../../utils/style/fonts";
import { layout } from "../../../utils/style/layout";
import { BrandText } from "../../BrandText";
import { Separator } from "../../Separator";
import { SecondaryButton } from "../../buttons/SecondaryButton";

export const FreelanceServicesSellerHeader: React.FC = () => {
  const navigation = useAppNavigation();
  const selectedWallet = useSelectedWallet();
  const [isSeller, setIsSeller] = useState(true);
  const networkId = useSelectedNetworkId();

  useEffect(() => {
    const checkIsSeller = async () => {
      try {
        const cosmwasmClient = await mustGetNonSigningCosmWasmClient(networkId);
        const network = mustGetCosmosNetwork(networkId);
        const sellerQueryClient = new TeritoriSellerQueryClient(
          cosmwasmClient,
          network.freelanceSellerAddress!
        );
        const profileHash = await sellerQueryClient.getSellerProfile(
          selectedWallet?.address!
        );
        setIsSeller(!!profileHash);
      } catch (e) {
        console.error("Fail checking isSeller:", e);
        setIsSeller(false);
      }
    };
    checkIsSeller();
  }, [networkId, selectedWallet]);

  return (
    <View style={{ alignItems: "center" }}>
      <BrandText
        style={[fontSemibold28, { alignSelf: "center", marginTop: 48 }]}
      >
        Progress through your Efforts
      </BrandText>
      {!isSeller && (
        <SecondaryButton
          style={{ marginTop: layout.padding_x3_5 }}
          size="SM"
          text="Become a Seller"
          onPress={() => {
            navigation.navigate("FreelanceServicesProfileSeller");
          }}
        />
      )}
      <Separator style={{ width: 360, alignSelf: "center", marginTop: 42 }} />
    </View>
  );
};