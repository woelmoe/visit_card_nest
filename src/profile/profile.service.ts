import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'
import { Profile } from './dto/profile.output.js'
import { myOwnProfile } from './profile.data.js'

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile(): Promise<Profile> {
    const { name, links, description } = myOwnProfile

    const experience = await this.prisma.experience.findMany({
      include: {
        project: true,
        skills: true
      }
    })
    const skills = await this.prisma.skill.findMany()

    return {
      name,
      description,
      links,
      skills,
      experience
    }
  }
}
