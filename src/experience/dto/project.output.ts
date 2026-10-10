import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Project {
  @Field()
  name: string

  @Field(() => String, { nullable: true })
  description: string | null

  @Field(() => String, { nullable: true })
  url: string | null
}
