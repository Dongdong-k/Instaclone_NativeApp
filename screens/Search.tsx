import { defaultDataIdFromObject, gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const SearchContainer = styled.View({
  flex: 1,
  backgroundColor: "black",
  alignItems: "center",
  justifyContent: "center",
});

const SearchInput = styled.TextInput``;

const MessageContainer = styled.View``;
const MessageText = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 10px;
`;

export default function Search({ navigation }: any) {
  // useForm
  const { setValue, register, watch, handleSubmit } = useForm();
  // useLazyQuery : 원하는 경우에만 실행
  // startQueryFn : 트리거
  // called :  함수호출 여부 표현(boolean)
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_PHOTOS);

  const onValid = ({ keyword }: any) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
    console.log(data);
  };
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
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: searchBox,
    });
    register("keyword", { required: true, minLength: 2 });
  }, []);
  console.log(data);
  return (
    <DismissKeyboard>
      <SearchContainer>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size={"large"} />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined &&
        data?.searchPhotos?.length === 0 ? (
          <MessageContainer>
            <MessageText>Could not find anything</MessageText>
          </MessageContainer>
        ) : null}
      </SearchContainer>
    </DismissKeyboard>
  );
}
