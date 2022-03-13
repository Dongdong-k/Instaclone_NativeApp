import React from "react";
import { Image, Text, useWindowDimensions, View } from "react-native";

export default function UploadForm({ route }: any) {
  const { width } = useWindowDimensions(); // 화면 width 가져오기
  return (
    <View>
      <Image
        source={{ uri: route.params.file }}
        style={{ width: width, height: width }}
      />
    </View>
  );
}
