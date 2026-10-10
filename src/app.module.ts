import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { PrismaModule } from './prisma/prisma.module.js'
import { ProfileModule } from './profile/profile.module.js'
import { join } from 'path'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema/gql'),
      csrfPrevention: false,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    PrismaModule,
    ProfileModule
  ]
})
export class AppModule {}
