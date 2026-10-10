import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'
import { CreateHobbyInput } from './dto/create-hobby.input.js'

@Injectable()
export class HobbyService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateHobbyInput) {
    const existing = await this.prisma.hobby.findUnique({
      where: { name: input.name }
    })
    if (existing) {
      throw new ConflictException(`Hobby ${input.name} already exists`)
    }

    return this.prisma.hobby.create({
      data: {
        name: input.name
      }
    })
  }
}
