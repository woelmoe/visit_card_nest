import { GraphQLError } from 'graphql'

export class HobbyExistsException extends GraphQLError {
  constructor(name: string, code = 'HOBBY_ALREADY_EXISTS') {
    super(`Hobby ${name} already exists`, {
      extensions: { code, status: 409 }
    })
  }
}
