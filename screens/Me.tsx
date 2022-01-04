import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const MeContainer = styled.View({
  flex: 1,
  backgroundColor: "black",
  alignItems: "center",
  justifyContent: "center",
});

export default function Me() {
  return (
    <MeContainer>
      <Text style={{ color: "white" }}>Me</Text>
    </MeContainer>
  );
}
