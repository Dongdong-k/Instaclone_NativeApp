import React, { useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
  padding: 0px 40px;
`;

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
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 150 : -300}
        style={{ width: "100%" }}
      >
        <TextInput
          autoFocus={true}
          style={{ backgroundColor: "white", width: "100%" }}
          placeholder="First Name"
          placeholderTextColor={"gray"}
          returnKeyType="next"
          onSubmitEditing={() => onNext(lastNameRef)}
          blurOnSubmit={false}
        />
        <TextInput
          ref={lastNameRef}
          onSubmitEditing={() => onNext(userNameRef)}
          style={{ backgroundColor: "white", width: "100%" }}
          placeholder="Last Name"
          placeholderTextColor={"gray"}
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <TextInput
          ref={userNameRef}
          onSubmitEditing={() => onNext(emailRef)}
          style={{ backgroundColor: "white", width: "100%" }}
          placeholder="Username"
          placeholderTextColor={"gray"}
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <TextInput
          ref={emailRef}
          onSubmitEditing={() => onNext(passwordRef)}
          style={{ backgroundColor: "white", width: "100%" }}
          placeholder="Email"
          placeholderTextColor={"gray"}
          keyboardType="email-address"
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <TextInput
          ref={passwordRef}
          style={{ backgroundColor: "white", width: "100%" }}
          placeholder="Password"
          placeholderTextColor={"gray"}
          secureTextEntry
          returnKeyType="done"
          blurOnSubmit={false}
          onSubmitEditing={() => onDone()}
        />
        <AuthButton
          disabled={true}
          text="Create Account"
          onPress={() => null}
        />
      </KeyboardAvoidingView>
    </AuthLayout>
  );
}
