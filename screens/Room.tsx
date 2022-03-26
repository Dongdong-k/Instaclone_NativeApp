import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const SEE_ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      messages {
        id
        payload
        read
        user {
          userName
          avatar
        }
      }
    }
  }
`;

// navigation 으로 이동시 route, navigation prop 값 가지고 있음
// route 내 전달받은 Prop 확인가능
export default function Room({ route, navigation }: any) {
  const { data } = useQuery(SEE_ROOM_QUERY, {
    variables: { id: route.params.id },
  });
  console.log(data);

  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.userName}`,
    });
  }, []);
  return (
    <View>
      <Text>Room</Text>
    </View>
  );
}
