import { Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { CodeReviewQuestion } from "../../entity/CodeReviewQuestion";
import { CreateCodeReviewQuestionInput } from "./shared/CreateCodeReviewQuestionInput";
import { MyContext } from "../../types/Context";
import { CodeReviewQuestionResponse } from "./shared/CreateCodeReviewResponse";

@Resolver(CodeReviewQuestion)
export class CodeReviewQuestionResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => CodeReviewQuestionResponse)
  async createCodeReviewQuestion(
    @Arg("question") question: CreateCodeReviewQuestionInput,
    @Ctx() ctx: MyContext
  ) {
    const codeReviewQuestion = await CodeReviewQuestion.create({
      ...question,
      creatorId: ctx.req.session!.userId
    }).save();
    return { codeReviewQuestion };
  }
}
