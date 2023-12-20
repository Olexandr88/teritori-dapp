import React from "react";
import { View } from "react-native";

import { HomeProposals } from "./components/HomeProposals/HomeProposals";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { setIsLightTheme } from "../../../store/slices/settings";
import { useAppDispatch } from "../../../store/store";
import { ScreenFC } from "../../../utils/navigation";
import {
  EstateCardList,
  getEstateCardList,
} from "../components/EstateCard/EstateCardList";
import { RWAScreenContainer } from "../components/RWAScreenContainer/RWAScreenContainer";

export const RWAHomeScreen: ScreenFC<"RWAHome"> = () => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

  React.useEffect(() => {
    dispatch(setIsLightTheme(false));
  }, [dispatch]);

  return (
    <RWAScreenContainer headerTitle="Fractionalized Real State Launchpad">
      <View style={{ flex: 1, width: "100%" }}>
        <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
          <HomeProposals />
        </View>
        <View>
          <EstateCardList
            title="Available"
            cards={getEstateCardList()}
            style={{ marginTop: isMobile ? 40 : 24 }}
          />
          <EstateCardList
            title="Coming soon"
            cards={getEstateCardList(true)}
            style={{ marginTop: isMobile ? 30 : 64 }}
          />
          <EstateCardList
            title="Sold out"
            cards={getEstateCardList()}
            style={{ marginTop: isMobile ? 30 : 64 }}
          />
        </View>
      </View>
    </RWAScreenContainer>
  );
};
