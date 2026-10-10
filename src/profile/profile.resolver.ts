import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Profile } from './dto/profile.output.js'
import { ProfileService } from './profile.service.js'
import { Experience } from './dto/experience.output.js'
import { CreateExperienceInput } from './dto/create-experience.input.js'
import { HobbyService } from './hobby.service.js'
import { CreateHobbyInput } from './dto/create-hobby.input.js'
import { Hobby } from './dto/hobby.output.js'
import { ExperienceService } from './experience.service.js'

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private profileService: ProfileService,
    private experienceService: ExperienceService,
    private hobbyService: HobbyService
  ) {}

  @Query(() => Profile, { name: 'profile' })
  getProfile(): Promise<Profile> {
    return this.profileService.getProfile()
  }

  @Mutation(() => Experience, { name: 'createExperience' })
  createExperience(
    @Args('input') input: CreateExperienceInput
  ): Promise<Experience> {
    return this.experienceService.create(input)
  }

  @Mutation(() => Hobby, { name: 'createHobby' })
  createHobby(@Args('input') input: CreateHobbyInput): Promise<Hobby> {
    return this.hobbyService.create(input)
  }
}
