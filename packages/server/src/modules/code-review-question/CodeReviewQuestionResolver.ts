import { Resolver, Mutation, Arg, Ctx, Authorized, Query } from "type-graphql";
import { FindConditions } from "typeorm";

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

  @Query(() => [CodeReviewQuestion], { nullable: true })
  async findCodeReviewQuestion(
    @Arg("path", { nullable: true }) path: string, // @Arg("question") question: CreateCodeReviewQuestionInput,
    @Arg("repo") repo: string, // @Ctx() ctx: MyContext
    @Arg("branch") branch: string,
    @Arg("usename") username: string
  ) {
    // const codeReviewQuestions = await CodeReviewQuestion.find();
    // console.log(path, repo, branch, username);
    // return codeReviewQuestions;

    const where: FindConditions<CodeReviewQuestion> = {
      repo,
      branch,
      username
    };

    if (path) {
      where.path = path;
    }
    return CodeReviewQuestion.find({ where });
  }
}
