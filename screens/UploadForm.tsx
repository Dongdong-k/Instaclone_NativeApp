import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import { color } from "../color";
import HeaderRight from "../components/auth/HeaderRigth";
import DismissKeyboard from "../components/DismissKeyboard";

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 30px;
`;
const Photo = styled.Image`
  height: 400px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 5px 20px;
  border-radius: 100px;
`;

export default function UploadForm({ route, navigation }: any) {
  console.log(route);
  const { width } = useWindowDimensions(); // 화면 width 가져오기
  const { register, handleSubmit, setValue } = useForm();

  // Upload Mutation 실행시 로딩 표시
  const HeaderRightLoading = () => (
    <ActivityIndicator
      size={"small"}
      color={color.blue}
      style={{ marginRight: 10 }}
    />
  );

  // TextInput 모니터링
  useEffect(() => {
    register("caption");
  }, [register]);

  // 헤더 right 버튼 모니터링
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight navigation={navigation} name={"Feed"} text={"Next"} />
      ),
    });
  }, [navigation]);

  const onValid = ({ caption }: any) => {
    console.log(caption);
  };
  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Caption
            placeholder="Write a caption..."
            placeholderTextColor={"rgba(0,0,0,0.5)"}
            onChangeText={(text) => setValue("caption", text)}
            onSubmitEditing={handleSubmit(onValid)}
            returnKeyType={"done"}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}
