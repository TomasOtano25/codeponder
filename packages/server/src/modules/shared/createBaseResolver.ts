import {
  Resolver,
  Authorized,
  Mutation,
  Arg,
  ClassType,
  Ctx
} from "type-graphql";
import { MyContext } from "../../types/Context";

// import { MyContext } from "../../types/Context";
// @Authorized()
//   @Mutation(() => CreateCodeReviewQuestionResponse)
//   async createCodeReviewQuestion(
//     @Arg("question") question: CreateCodeReviewQuestionInput,
//     @Ctx() ctx: MyContext
//   ) {
//     const codeReviewQuestion = await CodeReviewQuestion.create({
//       ...question,
//       creatorId: ctx.req.session!.userId
//     }).save();
//     return { codeReviewQuestion };
//   }

export function createBaseResolver<
  T extends ClassType,
  ArgType extends ClassType
>(
  suffix: string,
  graphqlReturnType: T,
  // returnKey: string,
  entity: any,
  // argName: string,
  argType: ArgType
) {
  const argAndReturnKeyName = suffix[0].toLocaleLowerCase() + suffix.slice(1);
  @Resolver(entity, { isAbstract: true })
  abstract class BaseResolver {
    @Authorized()
    @Mutation(() => graphqlReturnType, { name: `create${suffix}` })
    async create(
      @Arg(argAndReturnKeyName, () => argType) input: ArgType,
      @Ctx() ctx: MyContext
    ) {
      console.log(input);
      const value = await entity
        .create({
          ...input,
          creatorId: ctx.req.session!.userId
        })
        .save();

      return { [argAndReturnKeyName]: value };
    }
  }

  return BaseResolver;
}
