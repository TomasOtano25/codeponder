import React from "react";
import Cookie from "cookie";
import Head from "next/head";
import PropTypes from "prop-types";
import { getDataFromTree } from "react-apollo";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { IntrospectionFragmentMatcher } from "apollo-cache-inmemory";

import initApollo from "./init-apollo";
import { isBrowser } from "./isBrowser";
import { MeQuery } from "../components/apollo-components";
import { meQuery } from "../graphql/user/query/me";
import introspectionQueryResultData from "./github-api-fragments.json";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionQueryResultData as any
});

const SERVER_LINK_OPTIONS = {
  uri: "http://localhost:4000/graphql",
  credentials: "include"
};
const GITHUB_LINK_OPTIONS = { uri: "https://api.github.com/graphql" };

// export let githubApolloClient:
//   | ApolloClient<NormalizedCacheObject>
//   | undefined = undefined;

function parseCookies(req?: any, options = {}) {
  return Cookie.parse(
    req ? req.headers.cookie || "" : document.cookie,
    options
  );
}

export default (App: any) => {
  return class WithData extends React.Component {
    static displayName = `WithData(${App.displayName})`;
    static propTypes = {
      apolloState: PropTypes.object.isRequired,
      githubApolloState: PropTypes.object.isRequired
    };

    static async getInitialProps(ctx: any) {
      const {
        Component,
        router,
        ctx: { req, res }
      } = ctx;
      const apollo = initApollo(
        SERVER_LINK_OPTIONS,
        {},
        { getToken: () => parseCookies(req).qid }
      );

      const {
        data: { me }
      } = await apollo.query<MeQuery>({
        query: meQuery
      });

      const githubApolloClient = initApollo(
        GITHUB_LINK_OPTIONS,
        {},
        {
          getToken: () => {
            return me ? me.accessToken : "";
          }
        },
        { fragmentMatcher }
      );

      ctx.ctx.apolloClient = apollo;
      ctx.ctx.githubApolloClient = githubApolloClient;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        return {};
      }

      if (!isBrowser) {
        try {
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
              githubApolloClient={githubApolloClient}
            />
          );
        } catch (error) {
          console.error("Error while running `getDataFromTree`", error);
        }

        Head.rewind();
      }

      const apolloState = apollo.cache.extract();
      const githubApolloState = apollo.cache.extract();

      return { ...appProps, me, apolloState, githubApolloState };
    }

    apolloClient: ApolloClient<NormalizedCacheObject>;
    githubApolloClient: ApolloClient<NormalizedCacheObject>;
    // apolloGitHubClient: ApolloClient<NormalizedCacheObject>;

    constructor(props: any) {
      super(props);

      this.apolloClient = initApollo(SERVER_LINK_OPTIONS, props.apolloState, {
        getToken: () => {
          return parseCookies().qid;
        }
      });

      this.githubApolloClient = initApollo(
        GITHUB_LINK_OPTIONS,
        props.githubApolloState,
        {
          getToken: () => {
            return props.me ? props.me.accessToken : "";
          }
        },
        { fragmentMatcher }
      );
    }

    render() {
      return (
        <App
          {...this.props}
          apolloClient={this.apolloClient}
          githubApolloClient={this.githubApolloClient}
        />
      );
    }
  };
};

// export default (App: any) => {
//   return class Apollo extends React.Component {
//     static displayName = "withApollo(App)";
//     static async getInitialProps(ctx: any) {
//       const { Component, router } = ctx;

//       let appProps = {};
//       if (App.getInitialProps) {
//         appProps = await App.getInitialProps(ctx);
//       }

//       // Run all GraphQL queries in the component tree
//       // and extract the resulting data
//       const apollo = initApollo();
//       if (!(process as any).browser) {
//         try {
//           // Run all GraphQL queries
//           await getDataFromTree(
//             <App
//               {...appProps}
//               Component={Component}
//               router={router}
//               apolloClient={apollo}
//             />
//           );
//         } catch (error) {
//           // Prevent Apollo Client GraphQL errors from crashing SSR.
//           // Handle them in components via the data.error prop:
//           // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
//           console.error("Error while running `getDataFromTree`", error);
//         }

//         // getDataFromTree does not call componentWillUnmount
//         // head side effect therefore need to be cleared manually
//         Head.rewind();
//       }

//       // Extract query data from the Apollo store
//       const apolloState = apollo.cache.extract();

//       return {
//         ...appProps,
//         apolloState
//       };
//     }

//     apolloClient: ApolloClient<NormalizedCacheObject>;

//     constructor(props: any) {
//       super(props);
//       this.apolloClient = initApollo(props.apolloState);
//     }

//     render() {
//       return <App {...this.props} apolloClient={this.apolloClient} />;
//     }
//   };
// };
