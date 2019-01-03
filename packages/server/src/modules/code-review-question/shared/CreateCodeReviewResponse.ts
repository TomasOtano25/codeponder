import { ObjectType, Field } from "type-graphql";
import { CodeReviewQuestion } from "../../../entity/CodeReviewQuestion";

@ObjectType()
export class CodeReviewQuestionResponse {
  @Field()
  codeReviewQuestion: CodeReviewQuestion;
}
