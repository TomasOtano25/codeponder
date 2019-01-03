import gql from "graphql-tag";
import { codeReviewQuestionInfoFragment } from "../fragments/codeReviewQuestionInfo";
import { CodeReviewQuestionInfoFragmentDoc } from "../../../components/apollo-components";

export const findCodeReviewQuestionsQuery = gql`
  query FindCodeReviewQuestions(
    $username: String!
    $branch: String!
    $repo: String!
    $path: String
  ) {
    findCodeReviewQuestions(
      usename: $username
      branch: $branch
      repo: $repo
      path: $path
    ) {
      ...CodeReviewQuestionInfo
    }
  }

  ${codeReviewQuestionInfoFragment}
`;
