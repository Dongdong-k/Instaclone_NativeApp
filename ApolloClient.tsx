import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  //   uri: "https://fc65-211-227-228-79.ngrok.io/graphql", // 시뮬레이터, 핸드폰 활용시 ngrok 서버 켜고 url 바꾸기
  uri: "https://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default client;
