import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Hobby {
  @Field()
  name: string
}
