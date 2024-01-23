import { useEffect, useState } from "react";
import { View } from "react-native";

import { AddressBookType } from "./AddressBookScreen";
import addSVG from "../../../../assets/icons/add-circle-outline.svg";
import { SpacerColumn } from "../../../components/spacer";
import { ScreenFC } from "../../../utils/navigation";
import { layout } from "../../../utils/style/layout";
import { BlurScreenContainer } from "../components/BlurScreenContainer";
import { CustomButton } from "../components/Button/CustomButton";
import CircularImgOrIcon from "../components/CircularImgOrIcon";
import MiniTextInput from "../components/MiniTextInput";

const addresses: AddressBookType[] = [
  { id: "asdfdasd", label: "Defi1", address: "fadfd..sdf" },
  { id: "asdfdasd8989", label: "Defi2", address: "fadfd..sdf" },
];

const EditAddressBookScreen: ScreenFC<"EditAddressBook"> = ({
  navigation,
  route,
}) => {
  const goBackTo = () =>
    navigation.replace("AddressBook", { back: "EditAddressBook" });

  const [address, setAddress] = useState<{ label: string; address: string }>({
    label: "",
    address: "",
  });
  const { addressId } = route.params;

  useEffect(() => {
    const filteredAddress = addresses.filter((item) => item.id === addressId);

    if (filteredAddress.length) {
      setAddress(filteredAddress[0]);
    }
  }, [addressId]);

  return (
    <BlurScreenContainer title="Edit Address" onGoBack={goBackTo}>
      <SpacerColumn size={2} />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: layout.spacing_x2,
        }}
      >
        <CircularImgOrIcon
          style={{ alignItems: "center", justifyContent: "center" }}
          icon={addSVG}
        />
      </View>
      <SpacerColumn size={4} />
      <View
        style={{
          justifyContent: "space-between",
          paddingHorizontal: layout.spacing_x2,
          flex: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <MiniTextInput placeholder="Label" value={address.label} />

          <SpacerColumn size={1} />
          <MiniTextInput placeholder="Address" value={address.address} />
        </View>

        <CustomButton onPress={() => {}} title="Save" />
      </View>
    </BlurScreenContainer>
  );
};

export default EditAddressBookScreen;
