import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'
import { CreateHobbyInput } from './dto/create-hobby.input.js'
import { PhilosophicalException } from '../common/philosophical.exception.js'
import { HobbyExistsException } from '../common/hobby-exists.exception.js'

@Injectable()
export class HobbyService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateHobbyInput) {
    const existing = await this.prisma.hobby.findUnique({
      where: { name: input.name }
    })
    if (existing) {
      throw new HobbyExistsException(input.name)
    }

    return this.prisma.hobby.create({
      data: {
        name: input.name
      }
    })
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.hobby.delete({ where: { id } })
      return true
    } catch (error) {
      throw new PhilosophicalException(id)
    }
  }
}
