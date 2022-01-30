import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View({
  flex: 1,
  backgroundColor: "black",
  alignItems: "center",
  justifyContent: "center",
});

export default function TakePhoto({ navigation }: any) {
  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.navigate("Feed")}>
        <Text style={{ color: "white" }}>TakePhoto</Text>
      </TouchableOpacity>
    </Container>
  );
}
