import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { cache } from "../ApolloClient";
import { color } from "../color";
import { ProfileScreenProp } from "./PhotoContainer";

const FOLLOWUSER_MUTATION = gql`
  mutation followUser($userName: String!) {
    followUser(userName: $userName) {
      ok
      error
    }
  }
`;

const UNFOLLOWUSER_MUTATION = gql`
  mutation UnfollowUser($userName: String!) {
    UnfollowUser(userName: $userName) {
      ok
      error
    }
  }
`;

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

  const followOnCompleted = (data: any) => {
    if (!followLoading) {
      console.log("follow on completed");
      console.log(data);
    }
  };

  const unfollowOnCompleted = (data: any) => {
    if (!unfollowLoading) {
      console.log("Unfollow on completed");
      console.log(data);
    }
  };

  const toggleUpdate = (cache: any, result: any) => {
    console.log(result);
    const userId = `User:${id}`;
    cache.modify({
      id: userId,
      fields: {
        isFollowing(prev: any) {
          return !prev;
        },
      },
    });
  };

  const [followMutation, { loading: followLoading }] = useMutation(
    FOLLOWUSER_MUTATION,
    { onCompleted: followOnCompleted, update: toggleUpdate }
  );
  const [unfollowMutation, { loading: unfollowLoading }] = useMutation(
    UNFOLLOWUSER_MUTATION,
    { onCompleted: unfollowOnCompleted, update: toggleUpdate }
  );

  const followOnValid = () => {
    if (!followLoading) {
      followMutation({ variables: { userName } });
    }
  };
  const unfollowOnValid = () => {
    if (!unfollowLoading) {
      unfollowMutation({ variables: { userName } });
      console.log("unfollow mutation success");
    }
  };

  return (
    <Wraaper>
      <Column onPress={() => navigation.navigate("Profile", { userName, id })}>
        <Avatar source={{ uri: avatar }} />
        <Username>{userName}</Username>
      </Column>
      {isMe ? null : (
        <FollowBtn
          onPress={
            isFollowing ? () => unfollowOnValid() : () => followOnValid()
          }
        >
          <FollowBtnText>{isFollowing ? "UnFollow" : "Follow"}</FollowBtnText>
        </FollowBtn>
      )}
    </Wraaper>
  );
}
