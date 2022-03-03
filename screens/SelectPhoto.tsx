import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { color } from "../color";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
`;
const Bottom = styled.View`
  flex: 1;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 3px;
  right: 1px;
`;
const numColumns = 4;

const HeaderRightText = styled.Text`
  color: ${color.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 5px;
`;

export default function SelectPhoto({ navigation }: any) {
  const { width } = useWindowDimensions(); // 화면 width 가져오기
  const [ok, setOk] = useState(false); // 권한 확인 및 요청 결과 확인하기
  const [photos, setPhotos] = useState<any>([]); // 사진 데이터 받아오기
  const [chosenPhoto, setChosenPhoto] = useState(""); // 선택한 사진 정보 가져오기
  const getalbums = async () => {
    // 사진 가져오기
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos); // 가져온 데이터 저장하기
  };
  const getPermissions = async () => {
    // 권한 확인 및 요청하기
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    // console.log(accessPrivileges, canAskAgain, ok);
    if (accessPrivileges === ("none" || "undefined") && canAskAgain) {
      // 권한요청 아직 요청 안함 && 권한요청 가능여부 확인 ==> 권한요청하기
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        // 권한 요청 후 수락한 경우
        setOk(true);
        getalbums();
      }
    } else if (accessPrivileges !== "none") {
      // 권한 확인시 권한이 있는 경우
      setOk(true);
      getalbums();
    }
  };
  const HeaderRight = () => {
    return (
      <TouchableOpacity>
        <HeaderRightText>Next</HeaderRightText>
      </TouchableOpacity>
    );
  };
  // [] 로 입력시 한번만 실행 뜻함
  useEffect(() => {
    getPermissions();
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [ok]);

  const choosePhoto = (uri: any) => {
    setChosenPhoto(uri); // 선택한 사진 uri 정보 저장하기
  };

  const renderItem = ({ item: photo }: any) => {
    return (
      <ImageContainer onPress={() => choosePhoto(photo.uri)}>
        <Image
          source={{ uri: photo.uri }}
          style={{ width: width / numColumns, height: width / numColumns }}
        />
        <IconContainer>
          <Ionicons
            name="checkmark-circle-outline"
            size={18}
            color={photo.uri === chosenPhoto ? color.blue : "white"} // 이미지 uri 와 선택한 사진의 uri 동일하면 색상변경
          />
        </IconContainer>
      </ImageContainer>
    );
  };
  return (
    <Container>
      <StatusBar hidden={true} />
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width: width, height: width }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
          numColumns={numColumns}
        />
      </Bottom>
    </Container>
  );
}
