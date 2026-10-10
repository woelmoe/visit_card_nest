import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Links {
  @Field()
  email: string

  @Field()
  telegram: string

  @Field()
  git: string

  @Field()
  hh: string
}
