import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Profile } from './dto/profile.output.js'
import { ProfileService } from './profile.service.js'
import { Experience } from '../experience/dto/experience.output.js'
import { CreateExperienceInput } from '../experience/dto/create-experience.input.js'
import { ExperienceService } from '../experience/experience.service.js'
import { UpdateExperienceInput } from '../experience/dto/update-experience.input.js'
import { Hobby } from '../hobby/dto/hobby.output.js'
import { CreateHobbyInput } from '../hobby/dto/create-hobby.input.js'
import { HobbyService } from '../hobby/hobby.service.js'

//
// В проекте побольше было бы разумнее вынести в отдельные резолверы
// НО чтобы не раздувать структуру из-за 6 ендпоинтов, я их все зарезолвил здесь
//

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

  // experience
  @Mutation(() => Experience, { name: 'createExperience' })
  createExperience(
    @Args('input') input: CreateExperienceInput
  ): Promise<Experience> {
    return this.experienceService.create(input)
  }

  @Mutation(() => Experience, { name: 'updateExperience' })
  updateExperience(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateExperienceInput
  ): Promise<Experience> {
    return this.experienceService.update(id, input)
  }

  @Mutation(() => Boolean, { name: 'deleteExperience' })
  deleteExperience(
    @Args('id', { type: () => ID }) id: string
  ): Promise<boolean> {
    return this.experienceService.delete(id)
  }

  // hobby

  @Mutation(() => Hobby, { name: 'createHobby' })
  createHobby(@Args('input') input: CreateHobbyInput): Promise<Hobby> {
    return this.hobbyService.create(input)
  }

  @Mutation(() => Boolean, { name: 'deleteHobby' })
  deleteHobby(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.hobbyService.delete(id)
  }
}
