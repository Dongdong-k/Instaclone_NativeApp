import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { FlatList, RefreshControl, View } from "react-native";
import { ROOM_FRAGMENT } from "../Fragments";
import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";
import RoomItem from "../components/rooms/RoomItem";

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

export default function Rooms() {
  const { data, loading, refetch } = useQuery(SEE_ROOMS_QUERY);
  const [refreshing, setRefreshing] = useState(false);

  console.log("Show Query Result : ", data);

  // refreshing
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // FlatList RenderItem
  const renderItem = ({ item: room }: any) => <RoomItem {...room} />;

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        data={data?.seeRooms}
        keyExtractor={(room) => "" + room.id} // number 아니라 string 입력 필요
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={"white"}
          />
        }
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          ></View>
        )}
      />
    </ScreenLayout>
  );
}
