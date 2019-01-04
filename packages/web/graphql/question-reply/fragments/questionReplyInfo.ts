import gql from "graphql-tag";
import { userInfoFragment } from "../../user/fragments/userInfo";

export const questionReplyInfoFragment = gql`
  fragment QuestionReplyInfo on QuestionReply {
    id
    text
    # creatorId
    creator {
      ...UserInfo
    }
  }

  ${userInfoFragment}
`;
