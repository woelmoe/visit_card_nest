import { Field, ObjectType } from '@nestjs/graphql'
import { Project } from './project.output.js'
import { Skill } from './skill.output.js'

@ObjectType()
export class Experience {
  @Field()
  project: Project

  @Field(() => [Skill])
  skills: Skill[]

  @Field(() => String, { nullable: true })
  company: string | null

  @Field(() => String, { nullable: true })
  position: string | null

  @Field()
  startDate: Date

  @Field(() => Date, { nullable: true })
  endDate?: Date | null
}
