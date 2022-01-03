import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const FeedContainer = styled.View({
  flex: 1,
  backgroundColor: "black",
  alignItems: "center",
  justifyContent: "center",
});

export default function Feed() {
  return (
    <FeedContainer>
      <Text style={{ color: "white" }}>Feed</Text>
    </FeedContainer>
  );
}
