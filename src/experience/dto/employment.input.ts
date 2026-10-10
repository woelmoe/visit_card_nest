import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class EmploymentInput {
  @Field()
  @IsString()
  company: string

  @Field()
  @IsString()
  position: string
}
