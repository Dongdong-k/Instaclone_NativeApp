import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const SearchContainer = styled.View({
  flex: 1,
  backgroundColor: "black",
  alignItems: "center",
  justifyContent: "center",
});

const SearchInput = styled.TextInput``;

export default function Search({ navigation }: any) {
  // useForm
  const { setValue, register, watch } = useForm();

  // 헤더 내 검색창 구현사기
  const searchBox = () => (
    <SearchInput
      style={{
        backgroundColor: "white",
        width: "100%",
        textAlign: "center",
      }}
      placeholder="Search Photos"
      placeholderTextColor={"black"}
      autoCapitalize="none" // 소문자로 인식
      returnKeyLabel="Search" // for android
      returnKeyType="search" // for iOS
      onChangeText={(text) => setValue("keyword", text)}
      autoCorrect={false}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: searchBox,
    });
    register("keyword");
  }, [register]);
  console.log(watch());
  return (
    <DismissKeyboard>
      <SearchContainer>
        <Text style={{ color: "white" }}>Photo</Text>
      </SearchContainer>
    </DismissKeyboard>
  );
}
