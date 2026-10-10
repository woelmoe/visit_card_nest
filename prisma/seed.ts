import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client.js'
import { EXPERIENCE, PROJECTS, SKILLS } from './seed-data.js'
import { Prisma } from '../src/generated/prisma/browser.js'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
})
const prisma = new PrismaClient({ adapter })

type Skills = Map<string, string>

async function main() {
  console.time('seeding')

  const skills = await seedSkills()
  await seedProject()
  await seedExperience(skills)

  console.timeEnd('seeding')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.log(error)
    await prisma.$disconnect()
    process.exit(1)
  })

async function seedSkills(): Promise<Skills> {
  const skills = await Promise.all(
    SKILLS.map((name) =>
      prisma.skill.upsert({
        where: { name },
        update: {},
        create: { name }
      })
    )
  )

  return new Map(skills.map((skill) => [skill.name, skill.id]))
}

async function seedProject() {
  await Promise.all(
    PROJECTS.map((project) =>
      prisma.project.upsert({
        where: { id: project.id },
        update: {},
        create: project
      })
    )
  )
}

async function seedExperience(skills: Map<string, string>) {
  await Promise.all(
    EXPERIENCE.map((experience) =>
      prisma.experience.upsert({
        where: { id: experience.id },
        update: {},
        create: createExperience(experience, skills)
      })
    )
  )
}

function createExperience(
  experience: (typeof EXPERIENCE)[number],
  skillMap: Skills
): Prisma.ExperienceCreateInput {
  const { id, company, position, startDate, endDate, projectId, skillNames } =
    experience
  const skills = {
    connect: skillNames.map((name) => {
      const id = skillMap.get(name)
      if (!id) throw new Error(`Skill ${name} does not exist`)
      return { id }
    })
  }
  return {
    id,
    company,
    position,
    startDate,
    endDate,
    skills,
    ...(projectId && {
      project: { connect: { id: projectId } }
    })
  }
}
