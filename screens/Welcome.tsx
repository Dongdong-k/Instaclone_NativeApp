import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { color } from "../color";

const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image`
  max-width: 50%;
  height: 300px;
`;

const CreateAccount = styled.View`
  background-color: ${color.blue};
  padding: 7px 10px;
  border-radius: 7px;
`;
const CreateAccountText = styled.Text`
  color: white;
  font-weight: 600;
`;

const LoginLink = styled.Text`
  color: ${color.blue};
  margin-top: 10px;
  font-weight: 600;
`;

export default function Welcome({ navigation }: any) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount ");
  const goToLogin = () => navigation.navigate("Login");
  return (
    <Container>
      <Logo resizeMode="contain" source={require("../assets/logo1.png")} />
      <TouchableOpacity onPress={goToCreateAccount}>
        <CreateAccount>
          <CreateAccountText>Create Account</CreateAccountText>
        </CreateAccount>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
    </Container>
  );
}
