import { Field, InputType } from '@nestjs/graphql'
import { IsInt, IsString, Max, Min } from 'class-validator'

@InputType()
export class SkillInput {
  @Field()
  @IsString()
  name: string

  @Field()
  @IsInt()
  @Min(1)
  @Max(5)
  level: number
}
