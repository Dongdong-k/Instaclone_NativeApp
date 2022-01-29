import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import UserRow from "../components/UserRow";
import { USER_FRAGMENT } from "../Fragments";

const LIKES_QUERY = gql`
  query seePhotolikes($id: Int!) {
    seePhotolikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export default function Likes({ route }: any) {
  const { data, loading, refetch } = useQuery(LIKES_QUERY, {
    variables: {
      id: route?.params?.photoId,
    },
    skip: !route?.params?.photoId,
  });

  const renderUser = ({ item: user }: any) => {
    return <UserRow {...user} />;
  };

  // Pull to Refresh
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  console.log("likes query data", data);
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seePhotolikes}
        renderItem={renderUser}
        style={{ width: "100%" }}
        keyExtractor={(item) => item.id}
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
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          ></View>
        )}
      />
    </ScreenLayout>
  );
}
