import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { logUserOut } from "../ApolloClient";

const CommentsContainer = styled.View({
  flex: 1,
  backgroundColor: "black",
  alignItems: "center",
  justifyContent: "center",
});

export default function Comments() {
  return (
    <CommentsContainer>
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text style={{ color: "white" }}>Comments </Text>
      </TouchableOpacity>
    </CommentsContainer>
  );
}
