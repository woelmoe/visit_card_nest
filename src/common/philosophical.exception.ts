import { GraphQLError } from 'graphql'

export class PhilosophicalException extends GraphQLError {
  constructor(id: string, code = 'CANNOT_DELETE_HOBBY_ERROR') {
    const message = `You can remove a human from hobby ${id}, but you cannot remove hobby ${id} from human...`
    super(message, {
      extensions: { code }
    })
  }
}
