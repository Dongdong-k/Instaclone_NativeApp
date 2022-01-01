import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Platform, Text, TextInput } from "react-native";
import styled from "styled-components/native";
import { isLoggedInVar } from "../ApolloClient";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInputForm } from "../components/auth/AuthShared";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    # 여기에 적는 이름과 argu명은 graphql에서 정의한 것과 동일하게 입력 필요
    login(userName: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login({ navigation }: any) {
  const passwordRef = useRef<TextInput>(null);
  const onNext = (Nextone: any) => Nextone?.current?.focus();
  const onCompleted = (data: any) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      isLoggedInVar(true);
      console.log(ok, isLoggedInVar);
    }
  };
  const [LogInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const { register, handleSubmit, setValue, watch } = useForm();
  const onValid = (data: any) => {
    if (!loading) {
      LogInMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    {
      register("username", { required: true });
      register("password", { required: true });
    }
  }, [register]);

  return (
    <AuthLayout>
      <TextInputForm
        placeholder="User Name"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)}
        autoCapitalize="none"
        // onChange={(e) => setValue("username", e.nativeEvent.text)}
      />
      <TextInputForm
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        secureTextEntry
        returnKeyType="done"
        blurOnSubmit={false}
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(password) => setValue("password", password)}
        // onChange={(password) => setValue("password", password)}
      />
      <AuthButton
        disabled={!watch("username") || !watch("password")}
        loading={loading}
        text="Log In"
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
