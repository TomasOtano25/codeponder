import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { CodeReviewQuestion } from "./CodeReviewQuestion";
import { QuestionReply } from "./QuestionReply";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field({ nullable: true })
  @Column({ type: "text", unique: true, nullable: true })
  username?: string;

  @Field()
  @Column({ type: "text", nullable: true })
  name: string;

  @Column({ type: "text", unique: true })
  githubId: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  pictureUrl?: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  bio?: string;

  // @Column({ type: "uuid", nullable: true })
  // codeReviewQuestionsId: string;

  @OneToMany(() => CodeReviewQuestion, crq => crq.creator)
  codeReviewQuestions: Promise<CodeReviewQuestion[]>;

  @OneToMany(() => QuestionReply, qr => qr.creator)
  questionReplies: Promise<QuestionReply[]>;

  @Field(() => String)
  accessToken: string;
}
