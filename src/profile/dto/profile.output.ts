import { Field, ObjectType } from '@nestjs/graphql'
import { Skill } from './skill.output.js'
import { Links } from './contacts.output.js'
import { Experience } from './experience.output.js'
import { Hobby } from './hobby.output.js'

@ObjectType()
export class Profile {
  @Field()
  name: string

  @Field()
  description: string

  @Field()
  location: string

  @Field()
  links: Links

  @Field(() => [Skill])
  skills: Skill[]

  @Field(() => [Experience])
  experience: Experience[]

  @Field(() => [Hobby])
  hobbies: Hobby[]
}
