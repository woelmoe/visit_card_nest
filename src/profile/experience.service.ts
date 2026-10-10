import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'
import { CreateExperienceInput } from './dto/create-experience.input.js'
import { Prisma } from '../generated/prisma/client.js'

interface ITransactionData {
  tx: Prisma.TransactionClient
  input: CreateExperienceInput
}

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateExperienceInput) {
    console.time('create exp')
    const created = await this.prisma.$transaction((tx) =>
      this.createTransaction({ tx, input })
    )
    console.log('new experience row created')
    console.timeEnd('create exp')
    return created
  }

  async createTransaction(data: ITransactionData) {
    const { tx, input } = data
    const { startDate, endDate } = input

    const projectId = await this.createProject(data)
    const employmentId = await this.createEmployment(data)
    const skillIds = await this.createSkills(data)

    return tx.experience.create({
      data: {
        skills: { connect: skillIds.map((id) => ({ id })) },
        projectId,
        employmentId,
        startDate,
        endDate
      },
      include: { project: true, skills: true, employment: true },
      relationLoadStrategy: 'join'
    })
  }

  async createEmployment(data: ITransactionData): Promise<string | null> {
    const { tx, input } = data
    if (!input.employment) return null

    const { company, position } = input.employment
    const created = await tx.employment.create({
      data: {
        company,
        position
      }
    })

    return created.id
  }

  async createProject(data: ITransactionData): Promise<string> {
    const { tx, input } = data
    const { name, description, url } = input.project
    const created = await tx.project.create({
      data: {
        name,
        description,
        url
      }
    })
    return created.id
  }

  async createSkills(data: ITransactionData): Promise<string[]> {
    const { tx, input } = data
    if (!input.skills || input.skills.length) return []

    const skills = await Promise.all(
      input.skills.map(async (skill) =>
        tx.skill.upsert({
          where: { name: skill.name },
          update: { level: skill.level },
          create: { name: skill.name, level: skill.level }
        })
      )
    )

    return skills.map((s) => s.id)
  }
}
