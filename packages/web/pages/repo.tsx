import * as React from "react";
// import { FolderTree } from "@codeponder/ui";
import { GitCreateTreeResponseTreeItem } from "@octokit/rest";

import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { octokit } from "../lib/octo";
import { MeQuery } from "../components/apollo-components";
import { meQuery } from "../graphql/user/query/me";
import { GetRepoObjectComponent } from "../components/github-apollo-components";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { GitHubApolloClientContext } from "../components/GithubApolloClientContext";

interface Props {
  repo: any;
  fileTree: GitCreateTreeResponseTreeItem[];
  githubApolloClient: ApolloClient<NormalizedCacheObject>;
}

export default class Repo extends React.PureComponent<Props> {
  static contextType = GitHubApolloClientContext;

  static async getInitialProps({
    apolloClient,
    query,
    res,
    ...ctx
  }: NextContextWithApollo) {
    const {
      data: { me }
    } = await apolloClient.query<MeQuery>({
      query: meQuery
    });

    octokit.authenticate({
      type: "oauth",
      token: me!.accessToken
    });

    // const response = await octokit.repos.get(query as any);
    const fileTree = await octokit.git.getTree({
      ...(query as any),
      tree_sha: "master"
      // recursive: 1
    });

    // const fileTreeSorted = await fileTree.data.tree.sort((a: any, b: any) => {
    //   if (a.type === "tree") {
    //     return -1;
    //   }
    //   if (a.type === "blob") {
    //     return 1;
    //   }
    //   return 0;
    // });

    // console.log(response.data);
    return {
      /*repo: response.data,*/ fileTree: fileTree.data.tree
    };
  }

  render() {
    console.log(this.context);
    return (
      // <div>
      //   <FolderTree
      //     items={this.props.fileTree}
      //     onItemPress={path => console.log(path)}
      //   />
      // </div>
      // (
      //   <FolderTree
      //     items={this.props.fileTree}
      //     onItemPress={path => console.log(path)}
      //   />
      // );
      <GetRepoObjectComponent
        variables={{
          name: "codeponder",
          expression: "master:packages/server",
          owner: "benawad"
        }}
        // ssr={false}
        client={this.context}
      >
        {({ data }) => {
          console.log(data);
          return null;
        }}
      </GetRepoObjectComponent>
    );
  }
}
