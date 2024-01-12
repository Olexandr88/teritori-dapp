import { View } from "react-native";

import CircularImgOrIcon from "./components/CircularImgOrIcon";
import MiniButton from "./components/MiniButton";
import MiniTextInput from "./components/MiniTextInput";
import addSVG from "../../../../assets/icons/add-circle-outline.svg";
import closeSVG from "../../../../assets/icons/close.svg";
import { SVG } from "../../../components/SVG";
import { CustomPressable } from "../../../components/buttons/CustomPressable";
import { SpacerColumn } from "../../../components/spacer";
import { ScreenFC } from "../../../utils/navigation";
import MiniHeader from "../Notifications/components/MiniHeader";
import { SettingBase } from "../components/SettingBase";

const AddAddressBookScreen: ScreenFC<"AddAddressBook"> = ({ navigation }) => {
  const onClose = () =>
    navigation.canGoBack()
      ? navigation.goBack()
      : navigation.replace("MiniTabs");

  return (
    <SettingBase
      background="transparent"
      reverseView={false}
      customHeader={
        <MiniHeader
          navigation={navigation}
          backEnabled
          title="Add Address"
          headerStyle={{ backgroundColor: "transparent" }}
          right={
            <CustomPressable onPress={onClose}>
              <SVG source={closeSVG} width={24} height={24} />
            </CustomPressable>
          }
        />
      }
    >
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SpacerColumn size={10} />
        <CircularImgOrIcon
          style={{ alignItems: "center", justifyContent: "center" }}
          icon={addSVG}
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          backgroundColor: "rgba(0,0,0,0.8)",
          height: "70%",
        }}
      >
        <View>
          <SpacerColumn size={3} />
          <MiniTextInput placeholder="Label" />

          <SpacerColumn size={1} />
          <MiniTextInput placeholder="Address" />
        </View>
        <MiniButton title="Save" />
      </View>
    </SettingBase>
  );
};

export default AddAddressBookScreen;
