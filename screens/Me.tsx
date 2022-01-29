import React, { useEffect } from "react";
import { AsyncStorage, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { logUserOut } from "../ApolloClient";
import useMe from "../hooks/useMe";

const MeContainer = styled.View({
  flex: 1,
  backgroundColor: "black",
  alignItems: "center",
  justifyContent: "center",
});

export default function Me({ navigation }: any) {
  const { data } = useMe();
  useEffect(() => {
    if (data?.me?.userName) {
      navigation.setOptions({
        title: `${data?.me?.userName}`,
      });
    }
  }, []);
  return (
    <MeContainer>
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text style={{ color: "white" }}>Me</Text>
      </TouchableOpacity>
    </MeContainer>
  );
}
