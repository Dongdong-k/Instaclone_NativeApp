import React from "react";
import { gql, useQuery } from "@apollo/client";
import { FlatList, Text, View } from "react-native";
import { ROOM_FRAGMENT } from "../Fragments";
import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

const RoomContainer = styled.View`
  background-color: black;
`;

const RoomText = styled.Text`
  color: white;
`;

export default function Rooms() {
  const { data, loading } = useQuery(SEE_ROOMS_QUERY);
  console.log("Show Query Result : ", data);
  const renderItem = ({ item: room }: any) => {
    return (
      <RoomContainer>
        <RoomText>
          {room.unreadTotal === "0"
            ? "Name of the other Person"
            : `${room.unreadTotal} messages`}
        </RoomText>
      </RoomContainer>
    );
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seeRooms}
        keyExtractor={(room) => "" + room.id} // number 아니라 string 입력 필요
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}
