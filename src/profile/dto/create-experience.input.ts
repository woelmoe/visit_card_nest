import {
  IsArray,
  IsDateString,
  IsOptional,
  ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'
import { Field, InputType } from '@nestjs/graphql'
import { SkillInput } from './skill.input.js'
import { ProjectInput } from './projects.input.js'
import { EmploymentInput } from './employment.input.js'

@InputType()
export class CreateExperienceInput {
  @Field(() => [SkillInput])
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillInput)
  skills?: SkillInput[]

  @Field(() => ProjectInput)
  @ValidateNested()
  @Type(() => ProjectInput)
  project: ProjectInput

  @Field(() => EmploymentInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => EmploymentInput)
  employment?: EmploymentInput

  @Field()
  @IsDateString()
  startDate: Date

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  endDate?: Date
}
