import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const ProfileContainer = styled.View({
  flex: 1,
  backgroundColor: "black",
  alignItems: "center",
  justifyContent: "center",
});

export default function Profile({ route }: any) {
  console.log("Profile");
  console.log(route);
  return (
    <ProfileContainer>
      <Text style={{ color: "white" }}>Profile</Text>
    </ProfileContainer>
  );
}
