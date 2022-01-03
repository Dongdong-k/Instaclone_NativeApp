import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const SearchContainer = styled.View({
  flex: 1,
  backgroundColor: "black",
  alignItems: "center",
  justifyContent: "center",
});

export default function Search() {
  return (
    <SearchContainer>
      <Text style={{ color: "white" }}>Search</Text>
    </SearchContainer>
  );
}
