import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from "react-native";
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

const SearchInput = styled.TextInput<SearchInputInterface>`
  background-color: rgba(255, 255, 255, 0.7);
  width: ${(props) => props.width / 1.5}px;
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
`;

const MessageContainer = styled.View``;
const MessageText = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 10px;
`;

interface SearchInputInterface {
  width: number; // TextInput props 추가
}

export default function Search({ navigation }: any) {
  const numColumns = 3; // Flatlist columns 수
  const { width } = useWindowDimensions(); // 화면 width 가져오기
  const { setValue, register, handleSubmit } = useForm(); // useForm
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_PHOTOS); // useLazyQuery : 원하는 경우에만 실행, startQueryFn : 트리거, called :  함수호출 여부 표현(boolean)

  const onValid = ({ keyword }: any) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };
  // 헤더 내 검색창 구현사기
  const searchBox = () => (
    <SearchInput
      placeholder="Search Photos"
      placeholderTextColor={"black"}
      autoCapitalize="none" // 소문자로 인식
      returnKeyLabel="Search" // for android
      returnKeyType="search" // for iOS
      onChangeText={(text) => setValue("keyword", text)}
      autoCorrect={false}
      onSubmitEditing={handleSubmit(onValid)}
      width={width}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: searchBox,
    });
    register("keyword", { required: true, minLength: 2 });
  }, []);
  const renderItem = ({ item: photo }: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Photo", { photoId: photo.id })}
      >
        <Image
          source={{ uri: photo.file }}
          style={{ width: width / numColumns, height: width / numColumns }}
        />
      </TouchableOpacity>
    );
  };
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
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              data={data?.searchPhotos}
              renderItem={renderItem}
              keyExtractor={(photo) => photo.id}
              numColumns={numColumns}
            />
          )
        ) : null}
      </SearchContainer>
    </DismissKeyboard>
  );
}
