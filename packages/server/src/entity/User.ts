import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

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
  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", unique: true })
  githubId: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  pictureUrl?: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  bio?: string;

  @Field(() => String)
  accessToken: string;
}
