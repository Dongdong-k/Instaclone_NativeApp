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
import useMe from "../hooks/useMe";
import { Ionicons } from "@expo/vector-icons";
import { color } from "../color";

const ROOM_UPDATES_SUBSCRIPTION = gql`
  subscription roomUpdates($id: Int!) {
    roomUpdates(id: $id) {
      id
      payload
      user {
        userName
        avatar
      }
      read
    }
  }
`;

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
      id
      messages {
        id
        payload
        user {
          userName
          avatar
        }
        read
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
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 5px 20px;
  border-radius: 1000px;
  color: white;
  width: 90%;
  margin-right: 10px;
`;

const InputContainer = styled.View`
  margin: 20px 0;
  width: 95%;
  margin-top: 50px;
  margin-top: 25px;
  flex-direction: row;
  align-items: center;
`;

const SendButton = styled.TouchableOpacity``;

interface MessageContainerInterface {
  outGoing: boolean; // ???????????? ????????? props ??????
}

// navigation ?????? ????????? route, navigation prop ??? ????????? ??????
// route ??? ???????????? Prop ????????????
export default function Room({ route, navigation }: any) {
  const { data: meData } = useMe(); // cache ??????????????? ?????? ????????????
  const { register, setValue, handleSubmit, getValues, watch } = useForm();

  // mutation ????????? ???????????? & cache ??????????????????
  const updateSendMessage = (cache: any, result: any) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;
    if (ok && meData) {
      // ????????? ??? ????????????
      const { message } = getValues();
      // ????????? ???????????????
      setValue("message", "");
      // message ?????? ?????????
      const messageObj = {
        id,
        payload: message,
        user: {
          userName: meData.me.userName,
          avatar: meData.me.avatar,
        },
        read: true,
        __typename: "Message",
      };

      // ????????? ??????????????????
      const messageFragment = cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              userName
              avatar
            }
            read
          }
        `,
        data: messageObj,
      });

      // ?????? ???????????? ????????? ??????
      // fields : ??? ??? ????????? ?????? ????????? ??????
      cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev: any) {
            return [...prev, messageFragment];
          },
        },
      });
    }
  };

  // Query, Mutation
  const { data, loading, refetch, subscribeToMore } = useQuery(SEE_ROOM_QUERY, {
    variables: { id: route?.params?.id },
  });
  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: updateSendMessage,
    }
  );

  // onVaild : ????????? data ?????? ??????
  const onValid = ({ message }: any) => {
    if (!sendingMessage) {
      sendMessageMutation({
        variables: {
          payload: message,
          roomId: route?.params?.id,
        },
      });
    }
  };

  // ????????? ?????? register
  useEffect(() => {
    register("message", { required: true });
  }, [register]);

  // ?????? ????????? ????????? ???????????? ?????? ????????????
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.userName}`,
    });
    refetch();
  }, []);

  // subscribeToMore
  useEffect(() => {
    // ????????? ???????????? ?????? ??????
    if (data?.seeRoom) {
      subscribeToMore({
        document: ROOM_UPDATES_SUBSCRIPTION,
        variables: {
          id: route?.params?.id,
        },
      });
    }
  }, [data]);

  const renderItem = ({ item: messages }: any) => {
    return (
      // outGoing Prop ?????? ??? ????????????
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

  // ????????? ????????? ?????? ????????? ??????
  // reverse() ?????? ???????????? Flatlist?????? ???????????? ?????? read-only ????????? ?????? ??????
  // messages ???????????? ?????? ???????????? ??? ?????? ??????
  const messages = [...(data?.seeRoom?.messages ?? [])];
  messages.reverse(); // ?????? ??????

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={
        Platform.OS === "android" ? -300 : Platform.OS === "ios" ? 100 : 0
      }
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          style={{ width: "100%", marginVertical: 10 }}
          inverted
          ItemSeparatorComponent={() => <View style={{ height: 1 }}></View>}
          data={messages}
          keyExtractor={(messages: any) => "" + messages.id}
          renderItem={renderItem}
        />
        <InputContainer>
          <MessageInput
            placeholder="Write a message..."
            placeholderTextColor={"rgba(255,255,255,0.5)"}
            returnKeyLabel="Send Message"
            returnKeyType="send"
            onChangeText={(text: any) => setValue("message", text)}
            onSubmitEditing={handleSubmit(onValid)}
            value={watch("message")}
            blurOnSubmit={false} // ?????? ????????? ????????? ???????????? ??????
          />
          <SendButton
            disabled={!Boolean(watch("message"))}
            onPress={handleSubmit(onValid)}
          >
            <Ionicons
              name="send"
              color={
                !Boolean(watch("message"))
                  ? "rgba(255,255,255,0.2)"
                  : `${color.blue}`
              }
              size={22}
            />
          </SendButton>
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
