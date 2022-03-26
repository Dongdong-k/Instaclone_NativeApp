import React from "react";
import styled from "styled-components/native";
import useMe from "../../hooks/useMe";
import {
  TouchableOpacity,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { color } from "../../color";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileScreenProp } from "../PhotoContainer";

const RoomContainer = styled.TouchableOpacity`
  background-color: black;
  padding: 15px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const RoomText = styled.Text`
  color: white;
`;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 20px;
`;
const Data = styled.View``;
const UnreadDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${color.blue};
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;
const UnreadText = styled.Text`
  color: white;
  margin-top: 2px;
  font-weight: 500;
`;

export default function RoomItem({ users, unreadTotal, id }: any) {
  // 나와 유저 중 내가 아닌 유저를 선택하기 위한 후크
  const { data: meData } = useMe();

  // 대화방에 내가 아닌 유저 선택하는 기능
  const talkingTo = users.find(
    (user: any) => user.userName !== meData?.me?.userName
  );

  // navigation : Room 으로 이동, typescript에서 type 지정 필요
  const navigation = useNavigation<ProfileScreenProp>();
  // 이동시 몇 가지 prop 전달 가능
  const goToRoom = () => navigation.navigate("Room", { id, talkingTo });
  return (
    <RoomContainer onPress={goToRoom}>
      <Column>
        <Avatar source={{ uri: talkingTo.avatar }} />
        <Data>
          <Username>{talkingTo.userName}</Username>
          <UnreadText>
            {unreadTotal} unread {unreadTotal === 1 ? "message" : "messages"}
          </UnreadText>
        </Data>
      </Column>
      <Column>{unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
    </RoomContainer>
  );
}
