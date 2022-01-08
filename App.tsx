import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar } from "./ApolloClient";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // method 2 - SplashScreen
  const [appIsReady, setAppIsReady] = useState(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar); // 로그인 변수 가져오기

  useEffect(() => {
    async function prepare() {
      try {
        // token 값 가져오기 & 유효한 경우 로그인
        const token = await AsyncStorage.getItem("token");
        if (token) {
          isLoggedInVar(true);
          tokenVar(token); // AsyncStorage 이용하는 것 보다 빠름
        }
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync(); // hideAsync 실행되기 전까지 스플래시 스크린 띄우기
        await Font.loadAsync(Ionicons.font); // 폰트 로딩하기
        await Asset.loadAsync([require("./assets/logo.png")]); // 이미지 로딩하기
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true); // appIsReady : false -> true
      }
    }
    prepare();
  }, []);

  // useCallback(함수, 배열) : 배열 내 값이 변경되기 전까지 함수를 저장해놓고 재사용 가능
  // appIsReady 값 변경 전까지 로딩시 SplashScreen.hideAsync() 함수 사용가능
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync(); // 프리로딩 완료 후 splash screen 을 숨기기
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  // onLayout : LayoutEvent(callback) 형식 타입 입력, 레이아웃 이벤트 발생시 화면 출력
  // mount or layout 변경시에 실행
  // Invoked on mount and on layout changes.
  // This event is fired immediately once the layout has been calculated,
  // but the new layout may not yet be reflected on the screen at the time
  // the event is received, especially if a layout animation is in progress.

  return (
    <ApolloProvider client={client}>
      <NavigationContainer onReady={onLayoutRootView}>
        <StatusBar backgroundColor="black" translucent={true} />
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}
