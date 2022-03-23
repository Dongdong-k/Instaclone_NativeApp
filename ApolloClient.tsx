import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

// 로그인 관련 변수 생성 & false 설정
export const isLoggedInVar = makeVar(false); // 로그인 여부 확인
export const tokenVar = makeVar(""); // 로그인 유저 확인

const TOKEN = "token";

// 로그인시 token 값 가져오면 값 저장하기
export const logUserIn = async (token: any) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar("");
};

const httpLink = createHttpLink({
  uri: "https://91f4-175-113-96-12.ngrok.io/graphql", // 시뮬레이터, 핸드폰 활용시 ngrok 서버 켜고 url 바꾸기
});

const uploadHttpLink = createUploadLink({
  uri: "https://91f4-175-113-96-12.ngrok.io/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(), // 값을 기입하지 않는 경우 현재 값을 가져옴
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  console.log("graphQLErrors : ", graphQLErrors);
  console.log("networkError", networkError);
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  //   uri: "https://localhost:4000/graphql",
  cache,
});

export default client;
