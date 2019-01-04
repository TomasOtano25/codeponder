import {
  Resolver,
  Authorized,
  Mutation,
  Arg,
  ClassType,
  Ctx,
  FieldResolver,
  Root
} from "type-graphql";
import { MyContext } from "../../types/Context";
import { User } from "../../entity/User";

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

    @FieldResolver(() => User)
    creator(@Root() root: any, @Ctx() ctx: MyContext) {
      console.log(root);
      return ctx.userLoader.load(root.creatorId);
    }
  }

  return BaseResolver;
}
