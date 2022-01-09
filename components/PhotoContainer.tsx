import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

const Container = styled.View`
  border: solid 1px green;
`;
const Header = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25;
  height: 25;
  border-radius: 15;
`;
const UserName = styled.Text`
  color: white;
  font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View``;
const Action = styled.TouchableOpacity``;
const Likes = styled.Text`
  color: white;
`;
const Caption = styled.View`
  flex-direction: row;
`;
const CaptionText = styled.Text`
  color: white;
  margin-left: 10px;
`;

interface seeFeed_seeFeed {
  __typename: "Photo";
  id: number;
  file: string;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  user: seeFeed_seeFeed_user;
  caption: string | null;
  comments: (seeFeed_seeFeed_comments | null)[];
  createdAt: string;
  isMine: boolean;
}

interface seeFeed_seeFeed_user {
  __typename: "User";
  userName: string;
  avatar: string | undefined;
}

interface seeFeed_seeFeed_comments {
  __typename: "Comment";
  id: number;
  user: seeFeed_seeFeed_user;
  payload: string;
  isMine: boolean;
  createdAt: string;
}

export default function PhotoContainer({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  comments,
}: seeFeed_seeFeed) {
  // 스크린 사이즈 받아오기
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(windowHeight - 500);
  const navigation = useNavigation();
  // 스크린 사이즈 받아와서 width 설정 & height 크기도 화면보다 클 경우 화면 크기로 설정
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      if (height > windowHeight) {
        setImageHeight(windowWidth);
      } else {
        setImageHeight(height);
      }
    });
  }, []);

  return (
    <Container>
      <Header onPress={() => navigation.navigate("Profile")}>
        <UserAvatar source={{ uri: user?.avatar }} resizeMode="cover" />
        <UserName>{user?.userName}</UserName>
      </Header>
      <File
        style={{
          width: windowWidth,
          height: imageHeight,
        }}
        resizeMode="cover"
        source={{ uri: file }}
      />
      <Actions>
        <Action />
        <Action />
      </Actions>
      <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
      <Caption>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <UserName>{user?.userName}</UserName>
        </TouchableOpacity>
        <CaptionText>{caption}</CaptionText>
      </Caption>
    </Container>
  );
}
