import * as React from "react";

import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { octokit } from "../lib/octo";

interface Props {
  repo: any;
}

export default class Repo extends React.PureComponent<Props> {
  static async getInitialProps({ query, res, ...ctx }: NextContextWithApollo) {
    const response = await octokit.repos.get(query as any);
    const fileTree = await octokit.git.getTree({
      ...(query as any),
      tree_sha: "master",
      recursive: 1
    });

    console.log(response.data);
    console.log(fileTree.data);
    return { repo: response.data, fileTree: fileTree.data };
  }

  render() {
    // console.log(this.props.repo);
    return <div>repo.tsx</div>;
  }
}
