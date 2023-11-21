import React from "react";
import {
  FlatList,
  Pressable,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";

import { SideBarButton } from "./SideBarButton";
import chevronRightSVG from "../../../../../../assets/icons/chevron-right.svg";
import RWAlaunchpadSVG from "../../../../../../assets/icons/launchpad-rwa.svg";
import launchpadSVG from "../../../../../../assets/icons/launchpad.svg";
import RWADarkLogo from "../../../../../../assets/logos/rwa-dark-logo.svg";
import RWALightLogo from "../../../../../../assets/logos/rwa-light-logo.svg";
import { SVG } from "../../../../../components/SVG";
import {
  SidebarRecordType,
  SidebarType,
} from "../../../../../components/navigation/types";
import { Separator } from "../../../../../components/separators/Separator";
import { SpacerColumn } from "../../../../../components/spacer";
import { useSidebar } from "../../../../../context/SidebarProvider";
import { useSelectedNetworkInfo } from "../../../../../hooks/useSelectedNetwork";
import { useIsLightTheme, useTheme } from "../../../../../hooks/useTheme";
import { NetworkKind } from "../../../../../networks";
import { useAppNavigation } from "../../../../../utils/navigation";
import {
  fullSidebarWidth,
  headerHeight,
  layout,
  smallSidebarWidth,
} from "../../../../../utils/style/layout";

const RWATopLogo = () => {
  const navigation = useAppNavigation();
  const isLightTheme = useIsLightTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{
          marginHorizontal: layout.spacing_x0_5,
        }}
        onPress={() => navigation.navigate("RWAHome")}
      >
        <SVG
          width={68}
          height={68}
          source={isLightTheme ? RWALightLogo : RWADarkLogo}
        />
      </TouchableOpacity>
    </View>
  );
};

const SpringConfig: WithSpringConfig = {
  stiffness: 100,
  mass: 0.5,
  restDisplacementThreshold: 0.2,
};

const getRWASideBarList: (isLightTheme: boolean) => SidebarRecordType = (
  isLightTheme,
) => {
  return {
    launchpad: {
      title: "Home",
      route: "RWAHome",
      id: "RWAHome",
      icon: isLightTheme ? RWAlaunchpadSVG : launchpadSVG,
    },
  };
};

const SidebarSeparator: React.FC = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        height: 1,
        marginHorizontal: layout.spacing_x2,
        backgroundColor: theme.borderColor,
        marginBottom: layout.spacing_x1,
      }}
    />
  );
};

export const SideBar: React.FC = () => {
  const selectedNetworkInfo = useSelectedNetworkInfo();
  const selectedNetworkKind = selectedNetworkInfo?.kind;
  const navigation = useAppNavigation();
  const { isSidebarExpanded, toggleSidebar } = useSidebar();
  const theme = useTheme();
  const isLightTheme = useIsLightTheme();
  const sideBarDatas = getRWASideBarList(isLightTheme);

  const layoutStyle = useAnimatedStyle(
    () => ({
      width: isSidebarExpanded
        ? withSpring(fullSidebarWidth, SpringConfig)
        : withSpring(smallSidebarWidth, SpringConfig),
    }),
    [isSidebarExpanded],
  );

  const toggleButtonStyle = useAnimatedStyle(
    () => ({
      transform: isSidebarExpanded
        ? [
            { rotateY: withSpring("180deg", SpringConfig) },
            { translateX: withSpring(20, SpringConfig) },
          ]
        : [
            { rotateY: withSpring("0deg", SpringConfig) },
            { translateX: withSpring(0, SpringConfig) },
          ],
    }),
    [isSidebarExpanded],
  );

  const onRouteChange = (name: SidebarType["route"]) => {
    // @ts-expect-error
    navigation.navigate(name);
  };

  return (
    <Animated.View
      style={[
        containerCStyle,
        layoutStyle,
        {
          borderColor: theme.borderColor,
          backgroundColor: theme.headerBackgroundColor,
        },
      ]}
    >
      <View style={{ height: headerHeight }}>
        <RWATopLogo />

        <Animated.View style={[toggleButtonContainerCStyle, toggleButtonStyle]}>
          <Pressable
            style={[toggleButtonCStyle, { borderColor: theme.borderColor }]}
            onPress={toggleSidebar}
          >
            <SVG color={theme.chevronIconColor} source={chevronRightSVG} />
          </Pressable>
        </Animated.View>

        <Separator color={theme.borderColor} />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Object.values(sideBarDatas)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          let { route } = item;
          if (
            item.disabledOn?.includes(
              selectedNetworkKind || NetworkKind.Unknown,
            )
          ) {
            route = "ComingSoon";
          }

          return (
            <SideBarButton
              key={item.id}
              onPress={onRouteChange}
              {...item}
              route={route}
            />
          );
        }}
        ListHeaderComponent={<SpacerColumn size={1} />}
        ListFooterComponent={<SidebarSeparator />}
      />
    </Animated.View>
  );
};

const containerCStyle: ViewStyle = {
  borderRightWidth: 1,
  zIndex: 100,
};

const toggleButtonContainerCStyle: ViewStyle = {
  position: "absolute",
  flex: 1,
  flexDirection: "row",
  right: -20,
  top: 0,
  bottom: 0,
};

const toggleButtonCStyle: ViewStyle = {
  borderWidth: 1,
  alignSelf: "center",
  height: 28,
  width: 20,
  alignItems: "center",
  justifyContent: "center",
  borderTopRightRadius: 6,
  borderBottomRightRadius: 6,
};