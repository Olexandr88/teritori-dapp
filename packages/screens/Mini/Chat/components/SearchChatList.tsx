import React from "react";
import { StyleProp, TextInput, View, ViewStyle } from "react-native";

import searchSVG from "../../../../../assets/icons/search-gray.svg";
import { SVG } from "../../../../components/SVG";
import { SpacerRow } from "../../../../components/spacer";
import { neutral33, neutralA3 } from "../../../../utils/style/colors";
import { fontMedium16 } from "../../../../utils/style/fonts";

interface SearchInputProps {
  value: string;
  setValue: (val: string) => void;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
}

export const SearchChatList = ({
  value,
  setValue,
  style,
  placeholder = "Search...",
}: SearchInputProps) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: neutral33,
          borderRadius: 6,
          padding: 6,
          width: "100%",
        },
        style,
      ]}
    >
      <>
        <SVG source={searchSVG} width={20} height={20} />
        <SpacerRow size={1} />
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={setValue}
          placeholderTextColor={neutralA3}
          style={[
            fontMedium16,
            {
              color: "#fff",
              width: "100%",
            },
          ]}
        />
      </>
    </View>
  );
};