import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import ScreenLayout from "../components/ScreenLayout";

const SEE_ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      messages {
        id
        payload
        read
        user {
          userName
          avatar
        }
      }
    }
  }
`;

const MessageContainer = styled.View``;
const Author = styled.View``;
const Avartar = styled.Image``;
const Username = styled.Text`
  color: white;
`;
const Message = styled.Text`
  color: white;
`;

const MessageInput = styled.TextInput`
  margin-bottom: 50px;
  width: 95%;
  padding: 5px 20px;
  border-radius: 1000px;
`;

// navigation 으로 이동시 route, navigation prop 값 가지고 있음
// route 내 전달받은 Prop 확인가능
export default function Room({ route, navigation }: any) {
  const { data, loading } = useQuery(SEE_ROOM_QUERY, {
    variables: { id: route.params.id },
  });
  console.log(data);

  // 화면 전환시 타이블 가져와서 헤더 입력하기
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.userName}`,
    });
  }, []);

  const renderItem = ({ item: messages }: any) => {
    return (
      <MessageContainer>
        <Author>
          <Avartar source={{ uri: messages.user.avatar }} />
          <Username>{messages.user.userName}</Username>
        </Author>
        <Message>{messages.payload}</Message>
      </MessageContainer>
    );
  };
  return (
    <ScreenLayout loading={loading}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={
          Platform.OS === "android" ? -300 : Platform.OS === "ios" ? 50 : 0
        }
        style={{
          flex: 1,
          backgroundColor: "gray",
        }}
      >
        <FlatList
          inverted={true} // 밑에서부터 데이터 출력됨
          style={{ width: "100%", backgroundColor: "pink" }}
          data={data?.seeRoom?.messages}
          keyExtractor={(messages: any) => "" + messages.id}
          renderItem={renderItem}
        />
        <MessageInput
          placeholder="Write a message..."
          placeholderTextColor={"white"}
          style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
          returnKeyLabel="Send Message"
          returnKeyType="send"
        />
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
