import { Resolver, Arg, Query, FieldResolver, Root, Ctx } from "type-graphql";
import { FindConditions } from "typeorm";

import { CodeReviewQuestion } from "../../entity/CodeReviewQuestion";
import { CreateCodeReviewQuestionInput } from "./createInput";
import { CreateCodeReviewQuestionResponse } from "./createResponse";
import { createBaseResolver } from "../shared/createBaseResolver";
import { QuestionReply } from "../../entity/QuestionReply";
import { MyContext } from "../../types/Context";

const CodeReviewQuestionBaseResolver = createBaseResolver(
  "CodeReviewQuestion",
  CreateCodeReviewQuestionResponse,
  // "codeReviewQuestion",
  CodeReviewQuestion,
  // "question",
  CreateCodeReviewQuestionInput
);

@Resolver(CodeReviewQuestion)
export class CodeReviewQuestionResolver extends CodeReviewQuestionBaseResolver {
  // constructor() {}

  // @Authorized()
  // @Mutation(() => CreateCodeReviewQuestionResponse)
  // async createCodeReviewQuestion(
  //   @Arg("question") question: CreateCodeReviewQuestionInput,
  //   @Ctx() ctx: MyContext
  // ) {
  //   const codeReviewQuestion = await CodeReviewQuestion.create({
  //     ...question,
  //     creatorId: ctx.req.session!.userId
  //   }).save();
  //   return { codeReviewQuestion };
  // }

  @Query(() => [CodeReviewQuestion], { nullable: true })
  async findCodeReviewQuestions(
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

    const stuff = await CodeReviewQuestion.find({ where });

    return stuff;
  }

  // @FieldResolver(() => User)
  // creator(
  //   @Root() codeReviewQuestion: CodeReviewQuestion,
  //   @Ctx() ctx: MyContext
  // ) {
  //   return ctx.userLoader.load(codeReviewQuestion.creatorId);
  // }

  @FieldResolver(() => [QuestionReply])
  replies(
    @Root() codeReviewQuestion: CodeReviewQuestion,
    @Ctx() ctx: MyContext
  ) {
    console.log(ctx.questionReplyLoader.load(codeReviewQuestion.id));
    return ctx.questionReplyLoader.load(codeReviewQuestion.id);
  }
}
