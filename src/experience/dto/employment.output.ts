import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Employment {
  @Field(() => String, { nullable: true })
  company: string | null

  @Field(() => String, { nullable: true })
  position: string | null
}
