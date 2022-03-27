import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import PhotoContainer from "../components/PhotoContainer";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../Fragments";
import { Ionicons } from "@expo/vector-icons";
import useMe from "../hooks/useMe";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
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

export default function Feed({ navigation }: any) {
  // refetch to refresh Feed
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });

  // Pull to Refresh
  const [refreshing, setRefreshing] = useState(false);
  const [firstLoggedIn, setFirstLoggedIn] = useState(true);

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderPhoto = ({ item: photo }: any) => {
    return <PhotoContainer {...photo} />;
  };

  // 헤더 우측 메신저 아이콘 클릭시 이벤트 : 메시지함으로 이동
  const MessagesButton = () => (
    <TouchableOpacity
      style={{ marginRight: 15 }}
      onPress={() => navigation.navigate("Messages")}
    >
      <Ionicons name="paper-plane" color="white" size={24} />
    </TouchableOpacity>
  );

  // 헤더 우측 메신저 아이콘 생성
  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesButton,
    });
  }, []);

  useEffect(() => {
    refetch();
    setFirstLoggedIn(false);
  }, [firstLoggedIn]);

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
            onRefresh={refresh}
            tintColor={"white"}
          />
        }
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeed?.length,
            },
          })
        }
        onEndReachedThreshold={1}
      />
    </ScreenLayout>
  );
}
