import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Text } from "react-native";
import { color } from "../../color";

const HeaderRightText = styled.Text`
  color: ${color.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 5px;
`;

interface HeaderRightInterface {
  onPress: () => void;
  text: string;
}

export default function HeaderRight({ onPress, text }: HeaderRightInterface) {
  return (
    <TouchableOpacity onPress={onPress}>
      <HeaderRightText>{text}</HeaderRightText>
    </TouchableOpacity>
  );
}
