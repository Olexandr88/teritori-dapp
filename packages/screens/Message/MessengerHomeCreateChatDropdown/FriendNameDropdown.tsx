import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import avatar from "../../../../assets/icons/avatar.svg";
import FlexRow from "../../../components/FlexRow";
import { SVG } from "../../../components/SVG";
import CustomIcon from "./CheckBoxIcon";

interface CheckboxItem {
  name: string;
  icon: string;
  checked: boolean;
}

interface CheckboxGroupProps {
  items: CheckboxItem[];
  onChange: (items: CheckboxItem[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ items, onChange }) => {
  const [checkboxItems, setCheckboxItems] = useState<CheckboxItem[]>(items);

  const handleCheckboxPress = (index: number) => {
    const newItems = [...checkboxItems];
    newItems[index].checked = !newItems[index].checked;
    setCheckboxItems(newItems);
    onChange(newItems);
  };

  return (
    <View>
      {checkboxItems.map((item, index) => (
        <View>
          <FlexRow>
            <TouchableOpacity
              key={index}
              style={styles.checkboxContainer}
              onPress={() => handleCheckboxPress(index)}
            >
              <View style={styles.checkbox}>
                {item.checked ? (
                  <CustomIcon width={32} height={32} color="#16BBFF" />
                ) : (
                  <CustomIcon width={32} height={32} color="grey" />
                )}
              </View>
            </TouchableOpacity>
            <SVG source={avatar} />
            <Text style={styles.checkboxLabel}>{item.name}</Text>
          </FlexRow>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  checkbox: {
    marginRight: 16,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
});

export default CheckboxGroup;