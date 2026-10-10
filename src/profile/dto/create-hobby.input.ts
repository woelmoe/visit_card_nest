import { Field, InputType } from '@nestjs/graphql'
import { IsString, Length } from 'class-validator'

@InputType()
export class CreateHobbyInput {
  @Field()
  @IsString()
  @Length(1, 100)
  name: string
}
