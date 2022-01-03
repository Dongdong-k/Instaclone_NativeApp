import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 로그인 관련 변수 생성 & false 설정
export const isLoggedInVar = makeVar(false); // 로그인 여부 확인
export const tokenVar = makeVar(""); // 로그인 유저 확인

// 로그인시 token 값 가져오면 값 저장하기
export const logUserIn = async (token: any) => {
  await AsyncStorage.setItem("token", token);
  isLoggedInVar(true);
  tokenVar(token);
};

const client = new ApolloClient({
  uri: "https://47da-175-113-96-12.ngrok.io/graphql", // 시뮬레이터, 핸드폰 활용시 ngrok 서버 켜고 url 바꾸기
  //   uri: "https://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default client;
