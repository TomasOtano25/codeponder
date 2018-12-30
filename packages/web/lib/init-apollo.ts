import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloReducerConfig
} from "apollo-boost";
import { createHttpLink, HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import fetch from "isomorphic-unfetch";
import { isBrowser } from "./isBrowser";

// let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const apolloMap: { [key: string]: ApolloClient<NormalizedCacheObject> } = {};

if (!isBrowser) {
  (global as any).fetch = fetch;
}

function create(
  linkOptions: HttpLink.Options,
  initialState: any,
  { getToken }: { getToken: () => string },
  cacheConfig: ApolloReducerConfig = {}
) {
  // const httpLink = createHttpLink({
  //   // uri: "http://localhost:4000/graphql",
  //   uri,
  //   credentials: "include"
  // });
  const httpLink = createHttpLink(linkOptions);

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(cacheConfig).restore(initialState || {})
  });
}

export default function initApollo(
  linkOptions: HttpLink.Options,
  initialState: any,
  options: { getToken: () => string },
  cacheConfig: ApolloReducerConfig = {}
) {
  if (!isBrowser) {
    return create(linkOptions, initialState, options, cacheConfig);
  }

  // if (!apolloClient) {
  //   apolloClient = create(uri, initialState, options);
  // }
  if (!apolloMap[linkOptions.uri as string]) {
    apolloMap[linkOptions.uri as string] = create(
      linkOptions,
      initialState,
      options,
      cacheConfig
    );
  }

  // return apolloClient;
  return apolloMap[linkOptions.uri as string];
}
