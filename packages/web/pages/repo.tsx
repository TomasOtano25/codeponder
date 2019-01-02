import * as React from "react";
// import { FolderTree } from "@codeponder/ui";
// import { GitCreateTreeResponseTreeItem } from "@octokit/rest";

import { NextContextWithApollo } from "../types/NextContextWithApollo";
// import { octokit } from "../lib/octo";
// import { MeQuery } from "../components/apollo-components";
// import { meQuery } from "../graphql/user/query/me";
import {
  GetRepoObjectComponent,
  GetRepoObjectTreeInlineFragment
} from "../components/github-apollo-components";
// import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { GitHubApolloClientContext } from "../components/GithubApolloClientContext";
import { FolderTree } from "@codeponder/ui";
import { Link } from "../server/routes";

interface Props {
  query: {
    branch?: string;
    owner: string;
    path?: string;
    repo: string;
  };
}

export default class Repo extends React.PureComponent<Props> {
  static contextType = GitHubApolloClientContext;

  static async getInitialProps({ query }: NextContextWithApollo) {
    console.log(query);
    return {
      query
    };
  }

  render() {
    // console.log(this.context);
    const {
      query: { branch, owner, repo, path }
    } = this.props;

    const expression = `${branch || "master"}:${path || ""}`;
    return (
      <GetRepoObjectComponent
        variables={{
          name: repo,
          expression, //"master:packages/server",
          owner
        }}
        client={this.context}
      >
        {({ data, loading }) => {
          if (!data || loading) {
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
                    repo
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
