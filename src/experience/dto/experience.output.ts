import { Field, ObjectType } from '@nestjs/graphql'
import { Project } from './project.output.js'
import { Skill } from './skill.output.js'
import { Employment } from './employment.output.js'
import { IsDate } from 'class-validator'

@ObjectType()
export class Experience {
  @Field()
  id: string

  @Field()
  project: Project

  @Field(() => [Skill])
  skills: Skill[]

  @Field(() => Employment, { nullable: true })
  employment: Employment | null

  @Field()
  @IsDate()
  startDate: Date

  @Field(() => Date, { nullable: true })
  @IsDate()
  endDate?: Date | null
}
