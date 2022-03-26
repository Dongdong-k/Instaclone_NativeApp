import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { View } from "react-native";
import { isLoggedInVar, logUserOut } from "../ApolloClient";

const ME_QUERY = gql`
  query me {
    me {
      id
      userName
      avatar
    }
  }
`;

export default function useMe() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, refetch } = useQuery(ME_QUERY, { skip: !hasToken });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data, refetch };
}
