import React, { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { TextInputProps } from "react-native";

import {
  TextInputCustom,
  TextInputCustomRules,
} from "@/components/inputs/TextInputCustom";
import { layout } from "@/utils/style/layout";

interface TextInputCustomProps<T extends FieldValues>
  extends Omit<TextInputProps, "accessibilityRole" | "defaultValue"> {
  label: string;
  placeHolder: string;
  control: Control<T>;
  name: Path<T>;
  sublabel?: React.ReactElement;
  rules?: TextInputCustomRules;
  regexp?: RegExp;
  onChangeText?: (value: string) => void;
}

export const TextInputLaunchpad = <T extends FieldValues>({
  control,
  name,
  label,
  placeHolder,
  sublabel,
  regexp,
  rules,
  onChangeText,
}: TextInputCustomProps<T>) => {
  const [value, setValue] = useState("");
  return (
    <TextInputCustom<T>
      rules={{ required: true, ...rules }}
      labelStyle={{ maxWidth: 416 }}
      label={label}
      placeHolder={placeHolder}
      sublabel={sublabel}
      name={name}
      control={control}
      variant="labelOutside"
      containerStyle={{ marginBottom: layout.spacing_x2 }}
      boxMainContainerStyle={{ minHeight: 0 }}
      height={40}
      regexp={regexp}
      onChange={(e) => {
        setValue(e.nativeEvent.text);
        onChangeText?.(e.nativeEvent.text);
      }}
      value={value}
    />
  );
};
