import * as React from "react";
// import { FolderTree } from "@codeponder/ui";
// import { GitCreateTreeResponseTreeItem } from "@octokit/rest";

import { NextContextWithApollo } from "../types/NextContextWithApollo";
// import { octokit } from "../lib/octo";
// import { MeQuery } from "../components/apollo-components";
// import { meQuery } from "../graphql/user/query/me";
import {
  GetRepoObjectComponent,
  GetRepoObjectTreeInlineFragment,
  GetRepoObjectDocument
} from "../components/github-apollo-components";
// import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { GitHubApolloClientContext } from "../components/GithubApolloClientContext";
import { FolderTree } from "@codeponder/ui";
import { Link } from "../server/routes";

interface Props {
  // query: {
  branch?: string;
  owner: string;
  path?: string;
  name: string;
  expression: string;
  // };
}

export default class Repo extends React.PureComponent<Props> {
  static contextType = GitHubApolloClientContext;

  static async getInitialProps({
    query: { branch, owner, path, name },
    githubApolloClient
  }: NextContextWithApollo) {
    // console.log(query);
    const expression = `${branch || "master"}:${path || ""}`;

    const repository = await githubApolloClient.query({
      query: GetRepoObjectDocument,
      variables: {
        name,
        owner,
        expression
      }
    });

    console.log(repository.data);

    return {
      branch,
      owner,
      path,
      name,
      expression
    };
  }

  render() {
    // console.log(this.context);
    // const {
    //   query: { branch, owner, repo, path }
    // } = this.props;

    // const expression = `${branch || "master"}:${path || ""}`;
    const { branch, owner, path, name, expression } = this.props;

    return (
      <GetRepoObjectComponent
        variables={{
          // name: repo,
          name,
          expression, //"master:packages/server",
          owner
        }}
        client={this.context}
      >
        {({ data, loading }) => {
          if (!data || loading) {
            console.log("render null");
            return null;
          }

          if (!data.repository) {
            return "could not find repo";
          }

          if (!data.repository.object) {
            return "could not find folder/file";
          }

          const { object } = data.repository;

          if (object.__typename === "Blob") {
            return <pre>{object.text}}</pre>;
          }

          if (object.__typename === "Tree") {
            return (
              <FolderTree
                items={
                  (data.repository.object as GetRepoObjectTreeInlineFragment)
                    .entries || []
                }
                Link={Link}
                getLinkProps={itemPath => ({
                  // passHref: true,
                  route: "repo",
                  params: {
                    branch: branch ? branch : "master",
                    owner,
                    path: [
                      ...(path ? path.split("/") : []),
                      ...itemPath.split("/")
                    ] as any,
                    name
                  }
                })}
                // onItemPress={itemPath => {
                //   console.log(`${path || ""}/${itemPath}`);
                //   Router.pushRoute("repo", {
                //     branch: branch ? branch : "master",
                //     owner,
                //     // path: `${path || ""}${itemPath}`,
                //     path: [
                //       ...(path ? path.split("/") : []),
                //       ...itemPath.split("/")
                //     ],
                //     // : [...itemPath.split("/")],
                //     repo
                //   } as any);
                // }}
              />
            );
          }

          return "something went wrong";
        }}
      </GetRepoObjectComponent>
    );
  }
}
