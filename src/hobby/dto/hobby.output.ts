import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Hobby {
  @Field()
  id: string

  @Field()
  name: string
}
