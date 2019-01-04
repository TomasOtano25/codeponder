import gql from "graphql-tag";
import { questionReplyInfoFragment } from "../../question-reply/fragments/questionReplyInfo";
import { userInfoFragment } from "../../user/fragments/userInfo";

export const codeReviewQuestionInfoFragment = gql`
  fragment CodeReviewQuestionInfo on CodeReviewQuestion {
    id
    startingLineNum
    endingLineNum
    text
    path
    repo
    branch
    username
    # creatorId
    creator {
      ...UserInfo
    }
    replies {
      ...QuestionReplyInfo
    }
    createdAt
  }

  ${userInfoFragment}
  ${questionReplyInfoFragment}
`;
