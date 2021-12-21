import React from "react";
import styled from "styled-components/native";
import { color } from "../../color";

// View 대신 바로 TouchableOpacity 사용 가능
const Button = styled.TouchableOpacity`
  background-color: ${color.blue};
  padding: 13px 10px;
  margin-top: 20px;
  border-radius: 3px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

export default function AuthButton({ onPress, disabled, text }: any) {
  // navigation 실행코드
  return (
    <Button disabled={disabled} onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}
