import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View({
  flex: 1,
  backgroundColor: "black",
  alignItems: "center",
  justifyContent: "center",
});

export default function SelectPhoto() {
  return (
    <Container>
      <Text style={{ color: "white" }}>SelectPhoto</Text>
    </Container>
  );
}
