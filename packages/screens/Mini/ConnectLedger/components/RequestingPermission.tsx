import React from "react";
import { useWindowDimensions, View } from "react-native";

import requestingPermissionPNG from "../../../../../assets/icons/loader.png";
import { BrandText } from "../../../../components/BrandText";
import { SVGorImageIcon } from "../../../../components/SVG/SVGorImageIcon";
import { neutral77 } from "../../../../utils/style/colors";
import { fontMedium16, fontSemibold30 } from "../../../../utils/style/fonts";
import { layout } from "../../../../utils/style/layout";
import { CustomButton } from "../../components/Button/CustomButton";
import { StepType } from "../ConnectLedgerScreen";

type Props = {
  onStepChange: (step: StepType) => void;
};

export const RequestingPermission = ({ onStepChange }: Props) => {
  const onPressConnect = () => {
    onStepChange("step_3");
  };
  const { width: windowWidth } = useWindowDimensions();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center", paddingTop: 80, flex: 1 }}>
        <View
          style={{
            height: 152,
            width: 152,
            marginBottom: layout.spacing_x4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SVGorImageIcon icon={requestingPermissionPNG} iconSize={152} />
        </View>
        <BrandText
          style={[
            fontSemibold30,
            {
              width: 195,
              textAlign: "center",
              lineHeight: 36,
              marginBottom: layout.spacing_x1_5,
            },
          ]}
        >
          Requesting Permissions
        </BrandText>
        <BrandText
          style={[
            fontMedium16,
            {
              width: 250,
              color: neutral77,
              textAlign: "center",
              lineHeight: 22,
            },
          ]}
        >
          Please approve the connection request in your browser.
        </BrandText>
      </View>
      <CustomButton
        title="Connect"
        onPress={onPressConnect}
        width={windowWidth - 20}
        style={{
          position: "absolute",
          bottom: 30,
          left: 10,
          right: 10,
        }}
      />
    </View>
  );
};
