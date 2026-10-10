import { Field, ObjectType } from '@nestjs/graphql'
import { Project } from './project.output.js'
import { Skill } from './skill.output.js'
import { Employment } from './employment.output.js'

@ObjectType()
export class Experience {
  @Field()
  project: Project

  @Field(() => [Skill])
  skills: Skill[]

  @Field(() => Employment, { nullable: true })
  employment: Employment | null

  @Field()
  startDate: Date

  @Field(() => Date, { nullable: true })
  endDate?: Date | null
}
