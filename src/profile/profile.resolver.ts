import { Query, Resolver } from '@nestjs/graphql'
import { Profile } from './dto/profile.output.js'
import { ProfileService } from './profile.service.js'

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private profileService: ProfileService) {}

  @Query(() => Profile, { name: 'profile' })
  profile(): Promise<Profile> {
    return this.profileService.getProfile()
  }
}
