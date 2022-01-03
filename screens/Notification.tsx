import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const NotificationContainer = styled.View({
  flex: 1,
  backgroundColor: "black",
  alignItems: "center",
  justifyContent: "center",
});

export default function Notification() {
  return (
    <NotificationContainer>
      <Text style={{ color: "white" }}>Notification</Text>
    </NotificationContainer>
  );
}
