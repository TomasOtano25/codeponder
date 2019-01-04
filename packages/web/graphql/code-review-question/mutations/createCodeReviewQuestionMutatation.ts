import gql from "graphql-tag";
import { codeReviewQuestionInfoFragment } from "../fragments/codeReviewQuestionInfo";

export const createCodeReviewQuestionMutation = gql`
  mutation CreateCodeReviewQuestion(
    # $startingLineNum: Int!
    # $endingLineNum: Int!
    # $question: String!
    # $path: String
    # $repo: String!
    # $username: String!
    # $branch: String!
    $codeReviewQuestion: CreateCodeReviewQuestionInput!
  ) {
    createCodeReviewQuestion(
      codeReviewQuestion: $codeReviewQuestion # { #   startingLineNum: $startingLineNum #   endingLineNum: $endingLineNum #   question: $question
    ) #   path: $path
    #   repo: $repo
    #   username: $username
    #   branch: $branch
    # }
    {
      codeReviewQuestion {
        ...CodeReviewQuestionInfo
      }
    }
  }

  ${codeReviewQuestionInfoFragment}
`;
