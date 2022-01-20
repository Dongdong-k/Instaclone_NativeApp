import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { color } from "../color";
import { ProfileScreenProp } from "./PhotoContainer";

const Wraaper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
`;
const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
`;
const Username = styled.Text`
  font-weight: 600;
  color: white;
`;
const FollowBtn = styled.TouchableOpacity`
  background-color: ${color.blue};
  justify-content: center;
  padding: 5px 10px;
  border-radius: 4px;
`;
const FollowBtnText = styled.Text`
  color: white;
  font-weight: 600;
`;

export default function UserRow({
  avatar,
  id,
  userName,
  isFollowing,
  isMe,
}: any) {
  const navigation = useNavigation<ProfileScreenProp>();

  return (
    <Wraaper>
      <Column onPress={() => navigation.navigate("Profile", { userName, id })}>
        <Avatar source={{ uri: avatar }} />
        <Username>{userName}</Username>
      </Column>
      {isMe ? null : (
        <FollowBtn>
          <FollowBtnText>{isFollowing ? "UnFollow" : "Follow"}</FollowBtnText>
        </FollowBtn>
      )}
    </Wraaper>
  );
}
