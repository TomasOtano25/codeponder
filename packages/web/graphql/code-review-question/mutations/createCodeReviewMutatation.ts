import gql from "graphql-tag";
import { codeReviewQuestionInfoFragment } from "../fragments/codeReviewQuestionInfo";

export const createCodeReviewMutation = gql`
  mutation CreateCodeReview(
    $startingLineNum: Int!
    $endingLineNum: Int!
    $question: String!
    $path: String
    $repo: String!
    $username: String!
    $branch: String!
  ) {
    createCodeReviewQuestion(
      question: {
        startingLineNum: $startingLineNum
        endingLineNum: $endingLineNum
        question: $question
        path: $path
        repo: $repo
        username: $username
        branch: $branch
      }
    ) {
      codeReviewQuestion {
        ...CodeReviewQuestionInfo
      }
    }
  }

  ${codeReviewQuestionInfoFragment}
`;
