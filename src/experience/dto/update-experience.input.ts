import { Field, InputType, Int } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested
} from 'class-validator'
import { ProjectInput } from './projects.input.js'
import { EmploymentInput } from './employment.input.js'

@InputType()
export class UpdateSkillInput {
  @Field()
  @IsString()
  name: string

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  level?: number
}

@InputType()
export class UpdateExperienceInput {
  @Field(() => [UpdateSkillInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSkillInput)
  skills?: UpdateSkillInput[]

  @Field(() => ProjectInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectInput)
  project?: ProjectInput

  @Field(() => EmploymentInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => EmploymentInput)
  employment?: EmploymentInput

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  startDate?: Date

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  endDate?: Date
}
