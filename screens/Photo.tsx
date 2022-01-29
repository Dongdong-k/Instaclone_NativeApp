import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import PhotoContainer from "../components/PhotoContainer";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../Fragments";

const SEE_PHOTO = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
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
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default function Photo({ route, navigation }: any) {
  const { data, loading, refetch } = useQuery(SEE_PHOTO, {
    variables: { id: route?.params?.photoId },
  });

  // Pull to Refresh
  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={{ backgroundColor: "black" }}
      contentContainerStyle={{
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
      }}
      horizontal={false}
      directionalLockEnabled={true}
      alwaysBounceHorizontal={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
          tintColor={"white"}
        />
      }
    >
      <ScreenLayout
        loading={loading}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <PhotoContainer {...data?.seePhoto} />
      </ScreenLayout>
    </ScrollView>
  );
}
