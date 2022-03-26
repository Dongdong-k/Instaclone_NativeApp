import { gql, useMutation, useQuery } from "@apollo/client";
import { SortBy } from "expo-media-library";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
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

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`;

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
        createdAt
      }
    }
  }
`;

const MessageContainer = styled.View<MessageContainerInterface>`
  padding: 0 10px;
  margin-bottom: 20px;
  flex-direction: ${(prop) => (prop.outGoing ? "row-reverse" : "row")};
  align-items: flex-end;
`;
const Author = styled.View``;
const Avartar = styled.Image`
  width: 25px;
  height: 25px;
  border-radius: 25px;
`;

const Message = styled.Text`
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  border-radius: 10px;
  overflow: hidden;
  font-size: 16px;
  margin: 0px 10px;
`;

const MessageInput = styled.TextInput`
  margin: 20px 0;
  width: 95%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 5px 20px;
  border-radius: 1000px;
  color: white;
`;

interface MessageContainerInterface {
  outGoing: boolean; // 본인여부 확인용 props 추가
}

// navigation 으로 이동시 route, navigation prop 값 가지고 있음
// route 내 전달받은 Prop 확인가능
export default function Room({ route, navigation }: any) {
  const { register, setValue, handleSubmit } = useForm();
  const { data, loading, refetch } = useQuery(SEE_ROOM_QUERY, {
    variables: { id: route.params.id },
  });
  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION
  );

  console.log(data);
  // onVaild : 내부에 data 객채 존재
  const onValid = ({ message }: any) => {
    sendMessageMutation({
      variables: {
        payload: message,
        roomId: route?.params?.id,
      },
    });
  };

  // 메세지 입력 register
  useEffect(() => {
    register("message", { required: true });
  }, [register]);
  // 화면 전환시 타이블 가져와서 헤더 입력하기
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.userName}`,
    });
    refetch();
  }, []);

  const renderItem = ({ item: messages }: any) => {
    return (
      // outGoing Prop 생성 및 적용하기
      <MessageContainer
        outGoing={messages.user.userName !== route?.params?.talkingTo?.userName}
      >
        <Author>
          <Avartar source={{ uri: messages.user.avatar }} />
        </Author>
        <Message>{messages.payload}</Message>
      </MessageContainer>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={
        Platform.OS === "android" ? -300 : Platform.OS === "ios" ? 50 : 0
      }
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted={true} // 밑에서부터 데이터 출력됨
          style={{ width: "100%" }}
          data={data?.seeRoom?.messages}
          keyExtractor={(messages: any) => "" + messages.id}
          renderItem={renderItem}
        />
        <MessageInput
          placeholder="Write a message..."
          placeholderTextColor={"rgba(255,255,255,0.5)"}
          returnKeyLabel="Send Message"
          returnKeyType="send"
          onChangeText={(text: string) => setValue("message", text)}
          onSubmitEditing={handleSubmit(onValid)}
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
