import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";

import heartIcon from "../../../../assets/icons/Pathwar/heartIcon.svg";
import shareIcon from "../../../../assets/icons/Pathwar/shareIcon.svg";
import { Resources } from "../../../api/pathwar/v1/pathwar";
import { BrandText } from "../../../components/BrandText";
import { SVG } from "../../../components/SVG";
import { TertiaryBox } from "../../../components/boxes/TertiaryBox";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { neutral00, withAlpha } from "../../../utils/style/colors";
import { fontSemibold13, fontSemibold20 } from "../../../utils/style/fonts";
import { layout } from "../../../utils/style/layout";

export const ResourceBox: React.FC<{ data: Resources }> = ({ data }) => {
  const isMobile = useIsMobile();
  return (
    <TertiaryBox
      width={isMobile ? 320 : 480}
      height={330}
      mainContainerStyle={{ backgroundColor: "red" }}
      style={{
        marginRight: layout.padding_x1_5,
        marginTop: layout.padding_x1_5,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: layout.padding_x1_5,
            marginTop: layout.padding_x1_5,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {data.tags.map((tag) => (
              <View
                style={{
                  backgroundColor: withAlpha(neutral00, 0.3),
                  borderRadius: 8,
                  width: "fit-content",
                  height: "fit-content",
                  marginRight: layout.padding_x0_5,
                }}
              >
                <BrandText
                  style={[
                    {
                      paddingLeft: layout.padding_x1,
                      paddingRight: layout.padding_x1,
                      paddingTop: layout.padding_x0_5,
                      paddingBottom: layout.padding_x0_5,
                    },
                    fontSemibold13,
                  ]}
                >
                  {tag.text}
                </BrandText>
              </View>
            ))}
          </View>

          <View
            style={{ flexDirection: "row", marginRight: layout.padding_x1_5 }}
          >
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: withAlpha(neutral00, 0.3),
                  borderRadius: 8,
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: layout.padding_x0_5,
                }}
              >
                <SVG source={shareIcon} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: withAlpha(neutral00, 0.3),
                  borderRadius: 8,
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SVG source={heartIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            backgroundColor: withAlpha(neutral00, 0.3),
            width: 330,
            height: 86,
            borderRadius: 8,
            alignContent: "center",
            justifyContent: "center",
            marginLeft: layout.padding_x1_5,
            marginBottom: layout.padding_x1_5,
          }}
        >
          <View
            style={{
              justifyContent: "flex-start",
              alignContent: "flex-start",
              height: "100%",
              marginLeft: layout.padding_x1_5,
            }}
          >
            <BrandText
              style={[{ marginTop: layout.padding_x1_5 }, fontSemibold20]}
            >
              {data.title}
            </BrandText>
            <ScrollView style={{ height: 60 }}>
              <BrandText
                style={[{ marginBottom: layout.padding_x0_5 }, fontSemibold13]}
              >
                {data.description}
              </BrandText>
            </ScrollView>
          </View>
        </View>
      </View>
    </TertiaryBox>
  );
};