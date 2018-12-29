import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Repo extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text" })
  name: string;

  @Field()
  @Column({ type: "text" })
  description: string;

  @Field()
  @Column({ type: "text", unique: true })
  repoId: string;

  @Field()
  @Column({ type: "text" })
  language: string;

  @Field()
  @Column({ type: "text", unique: true })
  nodeId: string;
}
