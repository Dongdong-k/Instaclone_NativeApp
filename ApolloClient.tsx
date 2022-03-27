import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import {
  getMainDefinition,
  offsetLimitPagination,
} from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { CachePersistor } from "apollo3-cache-persist";
import { WebSocketLink } from "@apollo/client/link/ws";

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
  console.log("logOut");
  await AsyncStorage.multiRemove([TOKEN, "apollo-cache-persist"]); // token, apollo-cache 등 모두 삭제
  isLoggedInVar(false);
  tokenVar("");
};

const httpLink = createHttpLink({
  uri: "https://7fe9-175-113-96-12.ngrok.io/graphql", // 시뮬레이터, 핸드폰 활용시 ngrok 서버 켜고 url 바꾸기
});

const uploadHttpLink = createUploadLink({
  uri: "https://7fe9-175-113-96-12.ngrok.io/graphql",
});

// 모든 operation에서 발생
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

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

// websocket 생성시 최초 1회 발생
const wsLink = new WebSocketLink({
  uri: "ws://7fe9-175-113-96-12.ngrok.io/graphql",
  options: {
    reconnect: true,
    connectionParams: () => ({
      token: tokenVar(),
    }),
  },
});

// 상황에 따라 어떤 프로토콜을 쓸지 선택해야함 : http or ws
// ws : subscription 경우
// http : 이외 경우 (OperationDefinition)
// split(판단 함수, wsLink(true), httpLink(false))
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLinks
);

const client = new ApolloClient({
  link: splitLink,
  cache,
});

export default client;
