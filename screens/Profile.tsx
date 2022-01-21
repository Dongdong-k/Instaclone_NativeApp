import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const ProfileContainer = styled.View({
  flex: 1,
  backgroundColor: "black",
  alignItems: "center",
  justifyContent: "center",
});

export default function Profile({ navigation, route }: any) {
  useEffect(() => {
    if (route?.params?.userName) {
      navigation.setOptions({
        title: `${route?.params?.userName}'s Profile`,
      });
    }
  }, []);
  return (
    <ProfileContainer>
      <Text style={{ color: "white" }}>Profile</Text>
    </ProfileContainer>
  );
}
