import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import checkSVG from "../../../../assets/icons/check.svg";
import { BrandText } from "../../../components/BrandText";
import FlexRow from "../../../components/FlexRow";
import { SVG } from "../../../components/SVG";
import { SpacerRow } from "../../../components/spacer";
import {
  blueDefault,
  neutral17,
  neutralA3,
  secondaryColor,
} from "../../../utils/style/colors";
import { fontMedium16 } from "../../../utils/style/fonts";

type CheckboxProp = {
  isChecked: boolean;
  value: string;
  onPress: (isChecked: boolean, value: string) => void;
  checkboxColor?: string;
  labelStyle?: StyleProp<TextStyle>;
  checkboxStyle?: StyleProp<ViewStyle>;
  label?: string;
};

const Checkbox = ({
  isChecked,
  value,
  label,
  onPress,
  labelStyle,
  checkboxStyle,
  checkboxColor,
}: CheckboxProp) => {
  return (
    <>
      <FlexRow>
        <TouchableOpacity onPress={() => onPress(isChecked, value)}>
          <View
            style={[
              {
                width: 16,
                height: 16,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: neutralA3,
                backgroundColor: neutral17,
                justifyContent: "center",
                alignItems: "center",
              },
              isChecked && {
                backgroundColor: blueDefault,
                borderColor: blueDefault,
              },
              checkboxStyle,
            ]}
          >
            {isChecked && (
              <SVG
                source={checkSVG}
                width={8}
                height={8}
                fill={checkboxColor ?? secondaryColor}
              />
            )}
          </View>
        </TouchableOpacity>

        {label && (
          <>
            <SpacerRow size={1.4} />

            <BrandText
              style={[fontMedium16, { color: secondaryColor }, labelStyle]}
            >
              {label}
            </BrandText>
          </>
        )}
      </FlexRow>
    </>
  );
};

export default Checkbox;
