import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Badge } from "react-native-paper";

import Doublecheck from "../../../assets/icons/doublecheck.svg";
import { Separator } from "../../components/Separator";
import { neutral22, neutralA3, secondaryColor } from "../../utils/style/colors";
import {
  fontMedium10,
  fontSemibold11,
  fontSemibold13,
} from "../../utils/style/fonts";
import { BrandText } from "../BrandText";
import FlexRow from "../FlexRow";
import { SVG } from "../SVG";
import { SpacerColumn, SpacerRow } from "../spacer";

type Props = {
  name: string;
  isOnline: boolean;
  avatar: any;

  chat: string;
  time: string;
  iconCheck: any;
};

const SideBarChatConversation: React.FC<Props> = ({
  avatar,
  name,
  isOnline,
  chat,
  time,
  iconCheck,
}) => {
  const onlineStatusBadgeColor = isOnline ? "green" : "yellow";
  return (
    <View style={styles.container}>
      <FlexRow justifyContent="space-between">
        <View>
          <FlexRow>
            <Avatar.Image size={40} source={avatar} />
            <Badge
              style={{
                position: "absolute",
                top: 30,
                left: 30,

                backgroundColor: onlineStatusBadgeColor,
              }}
              size={12}
            />
            <SpacerRow size={1.5} />
            <View>
              <FlexRow>
                <BrandText style={[fontSemibold13, { color: secondaryColor }]}>
                  {name}
                </BrandText>
              </FlexRow>
              <SpacerColumn size={0.5} />
              <BrandText style={[fontSemibold11, { color: neutralA3 }]}>
                {chat}
              </BrandText>
            </View>
          </FlexRow>
        </View>
        <View>
          <FlexRow>
            <BrandText style={[fontMedium10, { color: secondaryColor }]}>
              {time}
            </BrandText>
            <SpacerRow size={0.6} />
            <SVG width={16} height={16} source={iconCheck} />
          </FlexRow>
        </View>
      </FlexRow>
      <SpacerColumn size={1.5} />
      <Separator color={neutral22} />
      <SpacerColumn size={1.5} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
  },
});

export default SideBarChatConversation;