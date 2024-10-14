import React from "react";
import { View } from "react-native";

import { Sort, SortDirection, Status } from "@/api/launchpad/v1/launchpad";
import { BrandText } from "@/components/BrandText";
import { ScreenContainer } from "@/components/ScreenContainer";
import { SpacerColumn } from "@/components/spacer";
import { useLaunchpadProjects } from "@/hooks/launchpad/useLaunchpadProjects";
import { useAppNavigation } from "@/hooks/navigation/useAppNavigation";
import { useSelectedNetworkId } from "@/hooks/useSelectedNetwork";
import { NetworkFeature } from "@/networks";
import { LaunchpadReadyApplicationsTable } from "@/screens/Launchpad/LaunchpadAdmin/LaunchpadReadyApplications/component/LaunchpadReadyApplicationsTable";
import {
  fontSemibold13,
  fontSemibold20,
  fontSemibold28,
} from "@/utils/style/fonts";
import { layout } from "@/utils/style/layout";

export const LaunchpadReadyApplicationsScreen: React.FC = () => {
  const selectedNetworkId = useSelectedNetworkId();
  const navigation = useAppNavigation();
  const { launchpadProjects = [] } = useLaunchpadProjects({
    networkId: selectedNetworkId,
    // userAddress: selectedWallet?.address || "",
    offset: 0,
    limit: 100, // TODO: Pagination
    sort: Sort.SORT_UNSPECIFIED,
    sortDirection: SortDirection.SORT_DIRECTION_UNSPECIFIED,
    status: Status.STATUS_COMPLETE, // TODO: Or STATUS_CONFIRMED ?
  });

  return (
    <ScreenContainer
      isLarge
      footerChildren={<></>}
      headerChildren={
        <BrandText style={fontSemibold20}>Administration Dashboard</BrandText>
      }
      responsive
      onBackPress={() => navigation.navigate("LaunchpadAdministrationOverview")}
      forceNetworkFeatures={[NetworkFeature.NFTLaunchpad]}
    >
      <View
        style={{
          marginTop: layout.spacing_x4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <BrandText style={fontSemibold28}>Ready to Launch</BrandText>
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 12,
            flexWrap: "nowrap",
            justifyContent: "space-between",
            marginTop: layout.spacing_x4,
          }}
        >
          {launchpadProjects?.length ? (
            <LaunchpadReadyApplicationsTable rows={launchpadProjects} />
          ) : (
            <BrandText style={fontSemibold13}>
              There is no application ready to launch
            </BrandText>
          )}
        </View>

        <SpacerColumn size={16} />
      </View>
    </ScreenContainer>
  );
};