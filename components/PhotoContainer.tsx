import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SectionList,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  border: solid 1px;
`;
const Header = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const UserAvatarNull = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  background-color: gray;
`;

const UserName = styled.Text`
  color: white;
  font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Likes = styled.Text`
  color: white;
  margin: 5px 0px;
  font-weight: 600;
`;
const Caption = styled.View`
  flex-direction: row;
  margin-left: 5px;
`;
const CaptionText = styled.Text`
  color: white;
  margin-left: 10px;
`;
const ExtraContainer = styled.View`
  padding: 10px;
`;
const Comments = styled.View`
  flex-direction: row;
  margin-left: 5px;
`;
const CommentUsername = styled.Text`
  color: white;
  margin-right: 10px;
`;
const Comment = styled.Text`
  color: white;
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

type RootStackParamList = {
  Profile: undefined;
  Likes: undefined;
  Comments: undefined;
  Photo: undefined;
};

type ProfileScreenProp = StackNavigationProp<RootStackParamList, "Profile">;

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
  const navigation = useNavigation<ProfileScreenProp>();
  // Commnet 화면
  const renderComment = ({ item }: any) => {
    return (
      <Comments>
        <CommentUsername>{item?.user.userName}</CommentUsername>
        <Comment>{item?.payload}</Comment>
      </Comments>
    );
  };
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
        {user.avatar ? (
          <UserAvatar source={{ uri: user?.avatar }} resizeMode="cover" />
        ) : (
          <UserAvatarNull source={{ uri: undefined }} />
        )}
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
      <ExtraContainer>
        <Actions>
          <Action>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              color={isLiked ? "tomato" : "white"}
              size={22}
            />
          </Action>
          <Action onPress={() => navigation.navigate("Comments")}>
            <Ionicons name="chatbubble-outline" color={"white"} size={22} />
          </Action>
        </Actions>
        <TouchableOpacity onPress={() => navigation.navigate("Likes")}>
          <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        </TouchableOpacity>
        <Caption>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <UserName>{user?.userName}</UserName>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraContainer>
    </Container>
  );
}
