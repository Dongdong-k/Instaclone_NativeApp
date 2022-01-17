import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { logUserOut } from "../ApolloClient";

const MeContainer = styled.View({
  flex: 1,
  backgroundColor: "black",
  alignItems: "center",
  justifyContent: "center",
});

export default function Likes() {
  return (
    <MeContainer>
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text style={{ color: "white" }}>Likes </Text>
      </TouchableOpacity>
    </MeContainer>
  );
}
