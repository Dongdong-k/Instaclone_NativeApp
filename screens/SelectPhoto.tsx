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
import HeaderRight from "../components/auth/HeaderRigth";

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

export default function SelectPhoto({ navigation }: any) {
  const { width } = useWindowDimensions(); // 화면 width 가져오기
  const [ok, setOk] = useState(false); // 권한 확인 및 요청 결과 확인하기
  const [photos, setPhotos] = useState<any>([]); // 사진 데이터 받아오기
  const [chosenPhoto, setChosenPhoto] = useState(""); // 선택한 사진 정보 가져오기
  const [photoNumbers, setPhotoNumber] = useState(20); // 사진 추가로딩 정보 설정

  // Flatlist 하단 도달시 사진 추가 로딩하기
  const getPhotos = async () => {
    console.log("load photos");
    // console.log("photoNumbers 전 : ", photoNumbers);
    setPhotoNumber(photoNumbers + 20);
    // console.log("photoNumbers 후 : ", photoNumbers);
  };

  const getalbums = async () => {
    // 사진 가져오기
    const { assets: photos } = await MediaLibrary.getAssetsAsync({
      // 최근 촬영일자로 정렬
      sortBy: MediaLibrary.SortBy.creationTime,
      first: photoNumbers,
    });
    await setPhotos(photos); // 가져온 데이터 저장하기
    // 첫 로딩시에만 첫 사진 선택
    if (chosenPhoto === "") {
      setChosenPhoto(photos[0].uri);
    }
  };

  const getPermissions = async () => {
    // 권한 확인 및 요청하기
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    // console.log(
    //   `accessPrivileges : ${accessPrivileges}, canAskAgain : ${canAskAgain}, ok:${ok}`
    // );
    if (accessPrivileges === undefined && canAskAgain) {
      // 권한요청 아직 요청 안함 && 권한요청 가능여부 확인 ==> 권한요청하기
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      // console.log("accessPrivileges : ", accessPrivileges);
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

  // [] 로 입력시 한번만 실행 뜻함
  useEffect(() => {
    getPermissions();
  }, [ok]);

  // 사진 추가 로딩시 앨범로딩
  useEffect(() => {
    getalbums();
  }, [photoNumbers]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight
          onPress={() =>
            navigation.navigate("UploadForm", { file: chosenPhoto })
          }
          text={"Next"}
        />
      ),
    });
  }, [chosenPhoto, photoNumbers, photos]);

  const choosePhoto = (uri: any) => {
    // console.log("uri : ", uri);
    setChosenPhoto(uri); // 선택한 사진 uri 정보 저장하기
    // console.log("사진 선택 완료 : ", chosenPhoto);
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
      <StatusBar hidden={false} />
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
          onEndReached={() => getPhotos()}
          onEndReachedThreshold={0.1}
        />
      </Bottom>
    </Container>
  );
}
