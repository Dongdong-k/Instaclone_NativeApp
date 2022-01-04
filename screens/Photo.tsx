import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const PhotoContainer = styled.View({
  flex: 1,
  backgroundColor: "black",
  alignItems: "center",
  justifyContent: "center",
});

export default function Photo({ navigation }: any) {
  return (
    <PhotoContainer>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text style={{ color: "white" }}>Profile</Text>
      </TouchableOpacity>
    </PhotoContainer>
  );
}
