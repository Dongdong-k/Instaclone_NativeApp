import React from "react";
import { ActivityIndicator, StatusBar } from "react-native";
import styled from "styled-components/native";

const FeedContainer = styled.View({
  flex: 1,
  backgroundColor: "black",
  alignItems: "center",
  justifyContent: "center",
});

export default function ScreenLayout({ loading, children }: any) {
  return (
    <FeedContainer>
      <StatusBar barStyle={"light-content"} hidden={false} />
      {loading ? (
        <ActivityIndicator color={"white"} size={"large"} />
      ) : (
        children
      )}
    </FeedContainer>
  );
}
