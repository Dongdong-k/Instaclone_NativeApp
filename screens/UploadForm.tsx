import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
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
import { FEED_PHOTO } from "../Fragments";

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

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedPhoto
    }
  }
  ${FEED_PHOTO}
`;

export default function UploadForm({ route, navigation }: any) {
  // useMutation : cache, result 값을 가지고 있음
  const updateUploadPhoto = (cache: any, result: any) => {
    // console.log("cache : ", cache);
    const {
      data: { uploadPhoto },
    } = result;

    if (uploadPhoto.id) {
      cache.modify({
        id: `ROOT_QUERY`,
        fields: {
          seeFeed(prev: any) {
            return [uploadPhoto, ...prev];
          },
        },
      });
    }
    // 업로드 후 Feed 스크린으로 가기
    navigation.navigate("Tabs");
  };

  const [uploadPhotoMutation, { loading }] = useMutation(
    UPLOAD_PHOTO_MUTATION,
    {
      update: updateUploadPhoto,
    }
  );
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
  // loading 할 때마다 헤더 다시 렌더링 시작
  useEffect(() => {
    // console.log("loading : ", loading);
    navigation.setOptions({
      headerRight: () =>
        // loading : true => 로딩표시
        // loading : false => Next 표시
        !loading ? (
          <HeaderRight onPress={handleSubmit(onValid)} text={"Next"} />
        ) : (
          <HeaderRightLoading />
        ),
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);

  const onValid = ({ caption }: any) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: "1.jpg", // 임의로 파일 이름 적용, 아마존 업로드시 파일이름 변경되고 백엔드에서도 별도로 지정 안한상태이기 때문.
      type: "image/jpeg",
    });
    uploadPhotoMutation({
      variables: {
        caption,
        file,
      },
    });
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
