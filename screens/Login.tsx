import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  margin-top: 100px;
`;

export default function Login({ navigation }: any) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
      <Container>
        <Text>Home</Text>
      </Container>
    </TouchableOpacity>
  );
}
