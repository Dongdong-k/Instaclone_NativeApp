import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInputForm } from "../components/auth/AuthShared";

export default function CreateAccount({ navigation }: any) {
  //useRef<TextInput | null>타입 정의 필요 :
  const lastNameRef = useRef<TextInput>(null);
  const userNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // useForm Hook 사용
  const { register, handleSubmit, setValue, watch } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  useEffect(() => {
    {
      register("firstname", {
        required: { value: true, message: "Type your First Name" },
      });
      register("lastname", { required: true });
      register("username", { required: true });
      register("email", { required: true });
      register("password", { required: true });
    }
  }, [register]);

  // enter 입력시 이동기능
  const onNext = (nextOne: any) => nextOne?.current?.focus();

  return (
    <AuthLayout>
      <TextInputForm
        autoFocus={true}
        placeholder="First Name"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
        blurOnSubmit={false}
        onChangeText={(text) => setValue("firstname", text)}
      />
      <TextInputForm
        ref={lastNameRef}
        onSubmitEditing={() => onNext(userNameRef)}
        placeholder="Last Name"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        returnKeyType="next"
        blurOnSubmit={false}
        onChangeText={(text) => setValue("lastname", text)}
      />
      <TextInputForm
        ref={userNameRef}
        onSubmitEditing={() => onNext(emailRef)}
        placeholder="User Name"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        returnKeyType="next"
        blurOnSubmit={false}
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInputForm
        ref={emailRef}
        onSubmitEditing={() => onNext(passwordRef)}
        placeholder="Email"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        keyboardType="email-address"
        returnKeyType="next"
        blurOnSubmit={false}
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInputForm
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        secureTextEntry
        returnKeyType="done"
        blurOnSubmit={false}
        lastOne={true}
        onChangeText={(text) => setValue("password", text)}
        onSubmitEditing={handleSubmit(onValid)}
      />
      <AuthButton
        loading={false}
        disabled={
          !watch("firstname") ||
          !watch("lastname") ||
          !watch("username") ||
          !watch("email") ||
          !watch("password")
        }
        text="Create Account"
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
