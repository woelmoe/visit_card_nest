import { Module } from '@nestjs/common'
import { ProfileResolver } from './profile.resolver.js'
import { ProfileService } from './profile.service.js'
import { ExperienceService } from './experience.service.js'
import { HobbyService } from './hobby.service.js'

@Module({
  providers: [ProfileResolver, ProfileService, ExperienceService, HobbyService]
})
export class ProfileModule {}
