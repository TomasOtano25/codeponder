import gql from "graphql-tag";
import { userInfoFragment } from "../fragments/userInfo";

export const meQuery = gql`
  query Me {
    me {
      ...UserInfo
      # id
      # username
      # pictureUrl
      # bio
      # accessToken
    }
  }

  ${userInfoFragment}
`;
