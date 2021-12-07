import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  // method 1 - AppLoading
  // loading 컴포넌트 생성하기 : default True
  /*
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = async () => {
    const fontToLoad = [Ionicons.font];
    const fontPromises = fontToLoad.map((font) => Font.loadAsync(font));
    console.log("fontPromises", fontPromises);
    await Promise.all(fontPromises);
  };
  // loading = ture, 로딩중 표시
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onFinish={onFinish}
        onError={console.warn}
      />
    );
  }
  */

  // method 2 - SplashScreen
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync(); // hideAsync 실행되기 전까지 스플래시 스크린 띄우기
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Ionicons.font); // 폰트 로딩하기
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
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
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync(); // 프리로딩 완료 후 splash screen 을 숨기기
    }
  }, [appIsReady]);
  console.log(onLayoutRootView);

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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>안녕하세요</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
