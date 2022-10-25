import React from "react";
import { View } from "react-native";

import { CollectionsRequest_Kind } from "../../api/marketplace/v1/marketplace";
import { ScreenContainer } from "../../components/ScreenContainer";
import { CollectionsCarouselSection } from "../../components/carousels/CollectionsCarouselSection";
import { ScreenFC } from "../../utils/navigation";
import { layout } from "../../utils/style/layout";

export const MarketplaceScreen: ScreenFC<"Marketplace"> = () => {
  return (
    <ScreenContainer>
      <View
        style={{
          paddingBottom: layout.contentPadding,
        }}
      >
        <CollectionsCarouselSection
          title="TERITORI Collections"
          kind={CollectionsRequest_Kind.KIND_TERITORI_FEATURES}
        />
        <CollectionsCarouselSection
          title="Upcoming Launches"
          kind={CollectionsRequest_Kind.KIND_UPCOMING}
        />
      </View>
    </ScreenContainer>
  );
};
