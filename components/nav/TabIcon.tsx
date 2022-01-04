import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function TabIcon({ focused, iconName, color }: any) {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={focused ? 24 : 20}
    />
  );
}
