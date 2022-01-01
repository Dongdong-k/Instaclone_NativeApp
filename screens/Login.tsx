import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Platform, Text, TextInput } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInputForm } from "../components/auth/AuthShared";

export default function Login({ navigation }: any) {
  const passwordRef = useRef<TextInput>(null);
  const onNext = (Nextone: any) => Nextone?.current?.focus();
  const onDone = () => {
    alert("good");
  };

  const { register, handleSubmit, setValue } = useForm();
  const onValid = (data: any) => {
    console.log(data);
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
        disabled={false}
        text="Log In"
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
