import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'
import { CreateExperienceInput } from './dto/create-experience.input.js'
import { Prisma } from '../generated/prisma/client.js'
import { UpdateExperienceInput } from './dto/update-experience.input.js'
import { EmploymentInput } from './dto/employment.input.js'
import { ProjectInput } from './dto/projects.input.js'

interface ITransactionData {
  tx: Prisma.TransactionClient
  input: CreateExperienceInput
}

interface ICreateEmploymentData {
  tx: Prisma.TransactionClient
  input: EmploymentInput
}
interface ICreateProjectData {
  tx: Prisma.TransactionClient
  input: ProjectInput
}

interface ITransactionUpdateData {
  id: string
  tx: Prisma.TransactionClient
  input: UpdateExperienceInput
}

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  public async create(input: CreateExperienceInput) {
    console.time('create exp')
    const created = await this.prisma.$transaction((tx) =>
      this.createTransaction({ tx, input })
    )
    console.log('new experience row created')
    console.timeEnd('create exp')
    return created
  }

  public async update(id: string, input: UpdateExperienceInput) {
    console.time('update exp')

    const updated = await this.prisma.$transaction((tx) =>
      this.updateTransaction({ id, tx, input })
    )
    console.log('new experience row updated')
    console.timeEnd('update exp')
    return updated
  }

  public async delete(id: string): Promise<boolean> {
    console.time('delete exp')

    await this.prisma.$transaction((tx) => this.deleteTransaction(id, tx))
    console.log('new experience row deleted')
    console.timeEnd('delete exp')
    return true
  }

  private async deleteTransaction(id: string, tx: Prisma.TransactionClient) {
    const existing = await tx.experience.findUnique({
      where: { id }
    })
    if (!existing) throw new NotFoundException(`Experience ${id} not found`)

    await tx.experience.update({
      where: { id },
      data: { skills: { set: [] } }
    })

    const { employmentId } = existing
    await tx.experience.delete({ where: { id } })

    if (existing.employmentId) {
      const isUsed = await tx.experience.count({
        where: { employmentId }
      })

      if (isUsed === 0) {
        await tx.employment.delete({ where: { id: existing.employmentId } })
      }
    }
  }

  private async updateTransaction(data: ITransactionUpdateData) {
    const { id, input, tx } = data
    const { startDate, endDate } = input

    const existing = await tx.experience.findUnique({
      where: { id }
    })
    if (!existing) throw new NotFoundException(`Experience ${id} not found`)

    const employmentId = await this.updateEmployment(data)
    const projectId = await this.updateProject(data)
    const skillIds = await this.updateSkills(data)

    const newData: Prisma.ExperienceUpdateInput = {}

    if (startDate !== undefined) newData.startDate = startDate
    if (endDate !== undefined) newData.endDate = endDate
    if (!!projectId) newData.project = { connect: { id: projectId } }
    if (!!employmentId) newData.employment = { connect: { id: employmentId } }
    if (!!skillIds?.length)
      newData.skills = { set: skillIds.map((id) => ({ id })) }

    return tx.experience.update({
      where: { id },
      data: newData,
      include: { project: true, skills: true, employment: true },
      relationLoadStrategy: 'join'
    })
  }

  private async createTransaction(data: ITransactionData) {
    const { tx, input } = data
    const { startDate, endDate } = input

    const projectId = await this.createProject({ tx, input: input.project })

    const employmentId = !input.employment
      ? undefined
      : await this.createEmployment({
          tx,
          input: input.employment
        })

    const skillIds = await this.createSkills(data)

    const newData: Prisma.ExperienceCreateInput = {
      startDate,
      project: { connect: { id: projectId } }
    }

    if (endDate !== undefined) newData.endDate = endDate
    if (!!employmentId) newData.employment = { connect: { id: employmentId } }
    if (!!skillIds?.length)
      newData.skills = { connect: skillIds.map((id) => ({ id })) }

    return tx.experience.create({
      data: newData,
      include: { project: true, skills: true, employment: true },
      relationLoadStrategy: 'join'
    })
  }

  private async updateEmployment(
    data: ITransactionUpdateData
  ): Promise<string | undefined> {
    const { id, tx, input } = data
    if (!input.employment) return

    const existing = await tx.experience.findUnique({
      where: { id },
      select: { employmentId: true }
    })

    if (!existing?.employmentId) {
      return await this.createEmployment({
        tx: data.tx,
        input: input.employment
      })
    }

    const { company, position } = input.employment
    const updated = await tx.employment.update({
      where: { id: existing?.employmentId },
      data: {
        company,
        position
      }
    })

    return updated.id
  }

  private async updateProject(
    data: ITransactionUpdateData
  ): Promise<string | undefined> {
    const { id, tx, input } = data
    if (!input.project) return

    const existing = await tx.experience.findUnique({
      where: { id },
      select: { projectId: true }
    })

    const { name, description, url } = input.project
    const updated = await tx.project.update({
      where: { id: existing?.projectId },
      data: {
        name,
        description,
        url
      }
    })
    return updated.id
  }

  private async updateSkills(
    data: ITransactionUpdateData
  ): Promise<string[] | null> {
    const { tx, input } = data
    if (!input.skills || input.skills.length === 0) return null

    const skills = await Promise.all(
      input.skills.map(async (skill) => {
        return tx.skill.upsert({
          where: { name: skill.name },
          update: { level: skill.level },
          create: { name: skill.name, level: skill.level }
        })
      })
    )

    return skills.map((s) => s.id)
  }

  private async createEmployment(data: ICreateEmploymentData): Promise<string> {
    const { tx, input } = data

    const { company, position } = input
    const created = await tx.employment.create({
      data: {
        company,
        position
      }
    })

    return created.id
  }

  private async createProject(data: ICreateProjectData): Promise<string> {
    const { tx, input } = data
    const { name, description, url } = input
    const created = await tx.project.create({
      data: {
        name,
        description,
        url
      }
    })
    return created.id
  }

  private async createSkills(
    data: ITransactionData
  ): Promise<string[] | undefined> {
    const { tx, input } = data
    if (!input.skills || input.skills.length === 0) return undefined

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
