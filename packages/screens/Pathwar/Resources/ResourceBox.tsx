import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { CgOptions } from "react-icons/cg";
import { View, TouchableOpacity } from "react-native";

import { BrandText } from "../../../components/BrandText";
import { TertiaryBox } from "../../../components/boxes/TertiaryBox";

export const ResourceBox: React.FC<object> = () => {
  return (
    <TertiaryBox
      width={630}
      height={330}
      mainContainerStyle={{ backgroundColor: "red" }}
      style={{ marginBottom: 20, marginLeft: 8, marginRight: 8 }}
    >
      <View
        style={{
          flexDirection: "row",
          bottom: 130,
          right: 0,
          width: 610,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              backgroundColor: "#0000004D",
              borderRadius: 8,
              width: "fit-content",
              height: 28,
              justifyContent: "center",
              alignContent: "center",
              marginRight: 5,
            }}
          >
            <BrandText style={{ fontSize: 13 }}>{"   Video   "}</BrandText>
          </View>
          <View
            style={{
              backgroundColor: "#0000004D",
              borderRadius: 8,
              width: "fit-content",
              height: 28,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <BrandText style={{ fontSize: 13 }}>{"   Video   "}</BrandText>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "#0000004D",
                borderRadius: 8,
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 5,
              }}
            >
              <CgOptions color="white" style={{ width: 22, height: 22 }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "#0000004D",
                borderRadius: 8,
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AiOutlineHeart color="white" style={{ width: 22, height: 22 }} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#0000004D",
          width: 330,
          height: 86,
          borderRadius: 6,
          top: 230,
          right: 285,
          position: "absolute",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <BrandText style={{ fontSize: 20 }}>Hello World!</BrandText>
          <BrandText style={{ fontSize: 13 }}>Video description</BrandText>
        </View>
      </View>
    </TertiaryBox>
  );
};
