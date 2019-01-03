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
import { FolderTree, Separator } from "@codeponder/ui";
import { Link } from "../server/routes";
import { string } from "yup";
import CodeFile from "../components/CodeFile";

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

  getParamsForPath = (path: string) => {
    console.log(path);
  };

  renderFilePath = (name: string, path?: string) => {
    if (!path) {
      return null;
    }
    const parts = [name, ...path.split("/")];
    let currentPath: string[] = [];
    // return <span>{parts.join(" / ")}</span>;

    return parts.map((part, idx) => {
      console.log(currentPath, part);
      if (idx) {
        currentPath.push(part);
      }

      return idx === parts.length - 1 ? (
        <strong key={part + idx}>{part}</strong>
      ) : (
        <React.Fragment key={part + idx}>
          <Link
            passHref={true}
            route="repo"
            params={{
              branch: this.props.branch ? this.props.branch : "master",
              owner: this.props.owner,
              path: [...currentPath] as any,
              name
            }}
          >
            <a>{part}</a>
          </Link>
          <Separator>/</Separator>
        </React.Fragment>
      );
    });

    // return parts.map((part, idx) =>
    //   idx === parts.length - 1 ? (
    //     <strong key={part + idx}>{part}</strong>
    //   ) : (
    //     <React.Fragment key={part + idx}>
    //       <Link
    //         passHref={true}
    //         route="repo"
    //         params={{
    //           branch: this.props.branch ? this.props.branch : "master",
    //           owner: this.props.owner,
    //           path: this.getParamsForPath(path) as any,
    //           name
    //         }}
    //         href="#"
    //       >
    //         <a>{part}</a>
    //       </Link>
    //       <Separator>/</Separator>
    //     </React.Fragment>
    //   )
    // );
  };

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
            return (
              <>
                {this.renderFilePath(name, path)}
                <CodeFile text={object.text} />
              </>
            );
          }

          if (object.__typename === "Tree") {
            return (
              <>
                {this.renderFilePath(name, path)}
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
              </>
            );
          }

          return "something went wrong";
        }}
      </GetRepoObjectComponent>
    );
  }
}
