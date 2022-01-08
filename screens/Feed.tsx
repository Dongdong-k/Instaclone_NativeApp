import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { logUserOut } from "../ApolloClient";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../Fragments";

const FeedContainer = styled.View({
  flex: 1,
  backgroundColor: "black",
  alignItems: "center",
  justifyContent: "center",
});

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        userName
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default function Feed() {
  const { data } = useQuery(FEED_QUERY);
  console.log(data);

  return (
    <FeedContainer>
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text style={{ color: "white" }}>Log Out</Text>
      </TouchableOpacity>
    </FeedContainer>
  );
}
