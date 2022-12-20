import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import refreshSVG from "../../assets/icons/refresh.svg";
import { neutral17, neutral33 } from "../utils/style/colors";
import { fontSemibold14 } from "../utils/style/fonts";
import { layout } from "../utils/style/layout";
import { BrandText } from "./BrandText";
import { SVG } from "./SVG";

interface RefreshButtonProps {
  isRefreshing: SharedValue<boolean>;
  title: string;
  onPress?(): void;
  widthToAnimate: number;
}

const SVG_SIZE = 16;

const LOADING_WIDTH = SVG_SIZE + layout.padding_x1_5 * 2;

export const RefreshButton: React.FC<RefreshButtonProps> = ({
  title,
  isRefreshing,
  onPress,
  widthToAnimate,
}) => {
  // variables
  const isRefreshingAnim = useDerivedValue(() => {
    return isRefreshing.value;
  }, [isRefreshing.value]);

  const roateValue = useDerivedValue(() => {
    return isRefreshingAnim.value === true
      ? withRepeat(
          withTiming(1, {
            duration: 1000,
            easing: Easing.linear,
          }),
          -1
        )
      : 0;
  }, [isRefreshingAnim.value]);

  const animStyle = useAnimatedStyle(
    () => ({
      width:
        isRefreshingAnim.value === true
          ? withTiming(LOADING_WIDTH)
          : withTiming(widthToAnimate),
    }),
    [isRefreshingAnim.value]
  );

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${roateValue.value * 360}deg`,
        },
      ],
    };
  }, [roateValue.value]);

  const opacityStyle = useAnimatedStyle(
    () => ({
      opacity: isRefreshingAnim.value
        ? withTiming(0, { duration: 100 })
        : withTiming(1, { duration: 800 }),
    }),
    [isRefreshingAnim.value]
  );

  // returns
  return (
    <Animated.View style={[styles.selfCenter, animStyle]}>
      <Pressable style={styles.container} onPress={onPress}>
        <Animated.View style={animatedStyles}>
          <SVG source={refreshSVG} width={SVG_SIZE} height={SVG_SIZE} />
        </Animated.View>
        <Animated.View style={[styles.textContainer, opacityStyle]}>
          <BrandText style={fontSemibold14}>{title}</BrandText>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  selfCenter: {
    alignSelf: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: neutral17,
    borderWidth: 1,
    borderColor: neutral33,
    borderRadius: 32,
    padding: layout.padding_x1_5,
  },
  textContainer: {
    marginLeft: layout.padding_x1_5,
  },
});
