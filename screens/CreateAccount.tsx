import React, { useRef } from "react";
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

  // enter 입력시 이동기능
  const onNext = (nextOne: any) => nextOne?.current?.focus();
  const onDone = () => {
    alert("good");
  };

  return (
    <AuthLayout>
      <TextInputForm
        autoFocus={true}
        placeholder="First Name"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
        blurOnSubmit={false}
      />
      <TextInputForm
        ref={lastNameRef}
        onSubmitEditing={() => onNext(userNameRef)}
        placeholder="Last Name"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        returnKeyType="next"
        blurOnSubmit={false}
      />
      <TextInputForm
        ref={userNameRef}
        onSubmitEditing={() => onNext(emailRef)}
        placeholder="User Name"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        returnKeyType="next"
        blurOnSubmit={false}
      />
      <TextInputForm
        ref={emailRef}
        onSubmitEditing={() => onNext(passwordRef)}
        placeholder="Email"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        keyboardType="email-address"
        returnKeyType="next"
        blurOnSubmit={false}
      />
      <TextInputForm
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        secureTextEntry
        returnKeyType="done"
        blurOnSubmit={false}
        onSubmitEditing={() => onDone()}
        lastOne={true}
      />
      <AuthButton disabled={true} text="Create Account" onPress={() => null} />
    </AuthLayout>
  );
}
