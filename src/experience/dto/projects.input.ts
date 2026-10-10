import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class ProjectInput {
  @Field()
  @IsString()
  name: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  url?: string
}
