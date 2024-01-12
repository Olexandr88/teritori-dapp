import React from "react";

import { SettingBase } from "./components/SettingBase";
import { SettingMenuItem } from "./components/SettingMenuItems";
import { ScreenFC } from "../../../utils/navigation";

export const SettingsScreen: ScreenFC<"MiniSettings"> = ({ navigation }) => {
  return (
    <SettingBase
      title="Settings"
      onGoBack={() => navigation.replace("MiniProfile")}
    >
      <SettingMenuItem title="Connected Apps" navigateTo="MiniSettings" />
      <SettingMenuItem title="Address Book" navigateTo="AddressBook" />
      <SettingMenuItem title="Change Network" navigateTo="ChangeNetwork" />
      <SettingMenuItem
        title="Security & Privacy"
        navigateTo="MiniSecurityAndPrivacy"
      />
      <SettingMenuItem title="Chat Settings" navigateTo="MiniChatSetting" />
      <SettingMenuItem title="About Teritori" navigateTo="About" />
    </SettingBase>
  );
};