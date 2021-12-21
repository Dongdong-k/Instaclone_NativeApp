import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { color } from "../color";
import AuthButton from "../components/auth/AuthButton";

const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
  padding: 0px 40px;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 300px;
`;

const LoginLink = styled.Text`
  color: ${color.blue};
  margin-top: 20px;
  font-weight: 600;
`;

export default function Welcome({ navigation }: any) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("Login");

  return (
    <Container>
      <Logo resizeMode="contain" source={require("../assets/logo1.png")} />
      <AuthButton
        disabled={false}
        onPress={goToCreateAccount}
        text={"Create New Account"}
      />
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
    </Container>
  );
}
