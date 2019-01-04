import { Resolver } from "type-graphql";

import { CreateQuestionReplyInput } from "./createInput";
// import { MyContext } from "../../types/Context";
import { CreateQuestionReplyResponse } from "./createResponse";
import { QuestionReply } from "../../entity/QuestionReply";
import { createBaseResolver } from "../shared/createBaseResolver";

// @Resolver(QuestionReply)
// export class QuestionReplyResolver {
//   constructor() {}

//   @Authorized()
//   @Mutation(() => CreateQuestionReplyResponse)
//   async createQuestionReply(
//     @Arg("reply") reply: CreateQuestionReplyInput,
//     @Ctx() ctx: MyContext
//   ) {
//     const questionReply = await QuestionReply.create({
//       ...reply,
//       creatorId: ctx.req.session!.userId
//     }).save();
//     return { questionReply };
//   }
// }

const QuestionReplyBaseResolver = createBaseResolver(
  "QuestionReply",
  CreateQuestionReplyResponse,
  // "questionReply",
  QuestionReply,
  // "reply",
  CreateQuestionReplyInput
);

@Resolver(QuestionReply)
export class QuestionReplyResolver extends QuestionReplyBaseResolver {
  // @FieldResolver(() => User)
  // creator(@Root() questionReply: QuestionReply, @Ctx() ctx: MyContext) {
  //   return ctx.userLoader.load(questionReply.creatorId);
  // }
}
