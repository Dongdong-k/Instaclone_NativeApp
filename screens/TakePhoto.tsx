import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled, { css } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/native";
import { CameraType } from "expo-camera/build/Camera.types";
import { FlipType, manipulateAsync } from "expo-image-manipulator";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.3;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.5);
`;

const SliderContainer = styled.View`
  bottom: 20px;
  position: absolute;
  width: 100%;
  align-items: center;
`;

const CameraContainer = styled.View`
  flex: 1;
  background-color: black;
`;

const CloseButton = styled.TouchableOpacity`
  ${Platform.select({
    ios: css``,
    android: css`
      position: absolute;
      top: 10px;
      left: 3px;
    `,
  })}
`;

const FlashContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const CameraTypeContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const PhotoBtnContainer = styled.TouchableOpacity`
  background-color: white;
  padding: 5px 10px;
  border-radius: 2px;
`;
const PhotoBtnText = styled.Text`
  font-weight: 600;
`;

export default function TakePhoto({ navigation }: any) {
  // 카메라 권한 반환하기
  const [ok, setOk] = useState(false);
  // zoom 값 반환하기
  const [zoom, setZoom] = useState(0.5);
  // 카메라 전/후방 선택하기
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back); // 카메라 전면/후면 설정
  // 카메라 Flash 설정
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  // 카메라 촬영 전 준비 확인
  const [cameraReady, setCameraReady] = useState(false);
  // 카메라 검정화면 개선안 : 화면 focus 시에 카메라 렌더링
  const isFocused = useIsFocused();
  // 카메라 촬영을 위한 ref 생성
  const camera = useRef<Camera>(null);
  // 카메라 촬영여부 확인 : 촬영 사진 확인 및 업로드 용도
  const [takenPhoto, setTakenPhoto] = useState("");

  // 카메라 권한 신청하기
  const requestPermission = async () => {
    await Camera.requestCameraPermissionsAsync();
  };

  // 카메라 권한 확인하기
  const getPermissions = async () => {
    const { granted } = await Camera.getCameraPermissionsAsync();
    setOk(granted); // 설정값 반환
  };

  // 최초 1회만 실행
  useEffect(() => {
    // 권한 정보 가져오기
    getPermissions();
  }, []);

  // 카메라 권한 신청하기
  const RequestPermissionScreen = () => {
    return (
      <TouchableOpacity
        style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
        onPress={() => requestPermission()}
      >
        <Text style={{ color: "white" }}>
          Please to confirm your camera access
        </Text>
      </TouchableOpacity>
    );
  };

  // 카메라 전/후방 전환하기
  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  // 가눙 : 슬라이더 위치 변경시 값을 카메라 zoom에 연결하기
  const onZoomValueChange = (data: any) => {
    setZoom(data);
  };

  /*
  // 슬라이더 컴포넌트
  const SliderPart = () => {
    return (
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={onZoomValueChange}
      />
    );
  };

  // 카메라 컴포넌트
  const CameraScreen = () => {
    return (
      <CameraContainer>
        <Camera
          type={cameraType}
          style={{ flex: 1, alignItems: "center" }}
          zoom={zoom}
        >
          <SliderContainer>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={onZoomValueChange}
            />
          </SliderContainer>
        </Camera>
        <Actions>
          <View style={{ flex: 1 }} />
          <TakePhotoBtn />
          <TouchableOpacity
            onPress={onCameraSwitch}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name={
                cameraType === Camera.Constants.Type.front
                  ? "camera-reverse-outline"
                  : "camera"
              }
              size={28}
              style={{
                color: "rgba(255, 255, 255, 0.4)",
              }}
            />
          </TouchableOpacity>
        </Actions>
      </CameraContainer>
    );
  };
  */
  // FlashMode 함수
  const onFlashChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      // off -> on
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      // on -> auto
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      // auto -> off
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  // 카메라 준비시 상태 변경
  const onCameraReady = () => setCameraReady(true);

  // 카메라 촬영 함수
  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      // console.log("camera.current : ", camera.current);
      const photo = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });

      //********************************************
      // 사진 출력 설정
      // 갤럭시 : 전면/후면 카메라 촬영시 회전 및 좌우 반전 발생
      // iOS : 별도 설정 필요 없음
      //********************************************
      if (Platform.OS === "android") {
        if (cameraType === Camera.Constants.Type.front) {
          console.log("사진 좌우 반전 for 전면 카메라");
          const maniPhoto = await manipulateAsync(photo.uri, [
            { flip: FlipType.Vertical },
            { rotate: 90 },
          ]);
          setTakenPhoto(maniPhoto.uri);
        } else {
          const maniPhoto = await manipulateAsync(photo.uri, [{ rotate: 270 }]);
          setTakenPhoto(maniPhoto.uri);
        }
      } else if (Platform.OS === "ios") {
        setTakenPhoto(photo.uri);
      }

      console.log(photo);
      // 촬영 데이터 저장하기 & 객체 반환
      // const asset = await MediaLibrary.createAssetAsync(photo.uri);
      // console.log("asset : ", asset);
    }
  };
  const goToUpload = async (save: boolean) => {
    if (save) {
      // 촬영 데이터 저장하기 & 객체 미반환
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    } else {
    }
  };
  const onDismiss = () => setTakenPhoto("");
  const onUpload = () => {
    Alert.alert(
      "Save Photo",
      "(1) Save & Upload Photo or (2) Just Upload Photo",
      [
        {
          text: "Save & Upload",
          onPress: () => goToUpload(true),
        },
        {
          text: "Upload",
          onPress: () => goToUpload(false),
        },
      ]
    );
  };

  return (
    <Container>
      {ok === false ? (
        <RequestPermissionScreen />
      ) : (
        <CameraContainer>
          <StatusBar hidden={true} />
          {isFocused ? (
            takenPhoto === "" ? (
              <Camera
                type={cameraType}
                style={{ flex: 1 }}
                zoom={zoom}
                flashMode={flashMode}
                ref={camera}
                onCameraReady={onCameraReady}
                autoFocus={"on"}
              >
                <CloseButton onPress={() => navigation.navigate("Tabs")}>
                  <Ionicons name="close" color={"white"} size={30} />
                </CloseButton>
                <SliderContainer>
                  <Slider
                    style={{ width: 300, height: 40 }}
                    value={zoom}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="rgb(255,255,255,0.5)"
                    onValueChange={onZoomValueChange}
                  />
                </SliderContainer>
              </Camera>
            ) : (
              <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
            )
          ) : (
            <Container />
          )}
          {takenPhoto === "" ? (
            <Actions>
              <FlashContainer onPress={onFlashChange}>
                <Ionicons
                  name={
                    flashMode === Camera.Constants.FlashMode.off
                      ? "flash-off"
                      : flashMode === Camera.Constants.FlashMode.on
                      ? "flash"
                      : flashMode === Camera.Constants.FlashMode.auto
                      ? "eye"
                      : undefined
                  }
                  size={28}
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                />
              </FlashContainer>
              <TakePhotoBtn onPress={takePhoto} />
              <CameraTypeContainer onPress={onCameraSwitch}>
                <Ionicons
                  name={
                    cameraType === Camera.Constants.Type.front
                      ? "camera-reverse-outline"
                      : "camera"
                  }
                  size={28}
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                />
              </CameraTypeContainer>
            </Actions>
          ) : (
            <Actions style={{ justifyContent: "space-around" }}>
              <PhotoBtnContainer onPress={onDismiss}>
                <PhotoBtnText>Dismiss</PhotoBtnText>
              </PhotoBtnContainer>
              <PhotoBtnContainer onPress={onUpload}>
                <PhotoBtnText>Upload</PhotoBtnText>
              </PhotoBtnContainer>
            </Actions>
          )}
        </CameraContainer>
      )}
    </Container>
  );
}
