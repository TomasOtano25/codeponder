import * as React from "react";
import { AppsListReposResponseRepositoriesItem } from "@octokit/rest";

import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { meQuery } from "../graphql/user/query/me";
import { MeQuery } from "../components/apollo-components";
import redirect from "../lib/redirect";
import { octokit } from "../lib/octo";
import { AutoSelect } from "../components/AutoSelect";

interface Props {
  // me: MeQuery;
  repositories: AppsListReposResponseRepositoriesItem[];
}

export default class PickRepo extends React.PureComponent<Props> {
  static async getInitialProps({
    apolloClient,
    ...ctx
  }: NextContextWithApollo) {
    const {
      data: { me }
    } = await apolloClient.query<MeQuery>({
      query: meQuery
    });

    if (!me) {
      redirect(ctx, "/");
      return {};
    }

    octokit.authenticate({
      type: "oauth",
      token: me.accessToken
    });

    // @todo handle  the case where they have more than 100 repos
    // const repos = await octokit.apps.listRepos({ per_page: 100, page: 1 });
    const repos = await octokit.repos.list({ per_page: 100 });

    // console.log(repos.data);

    return { me, repositories: repos.data };
  }
  render() {
    console.log(this.props.repositories);
    const { repositories } = this.props;
    return (
      <div>
        <AutoSelect
          items={repositories}
          itemToString={(item: any) => (item ? item.name : "")}
          onChange={item => {
            console.log(item);
          }}
        />
      </div>
    );
  }
}
