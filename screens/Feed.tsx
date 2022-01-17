import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import styled from "styled-components/native";
import PhotoContainer from "../components/PhotoContainer";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../Fragments";

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
  const { data, loading, refetch } = useQuery(FEED_QUERY);

  // Pull to Refresh
  const [refreshing, setRefreshing] = useState(false);

  const renderPhoto = ({ item: photo }: any) => {
    return <PhotoContainer {...photo} />;
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        data={data?.seeFeed}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(photo) => photo.id}
        renderItem={renderPhoto}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refetch}
            tintColor={"white"}
          />
        }
      />
    </ScreenLayout>
  );
}
