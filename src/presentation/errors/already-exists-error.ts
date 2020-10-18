export class AlreadyExistsError extends Error {
  constructor (fieldName: string) {
    super(`${fieldName} already exists in DB`)
    this.name = 'AlreadyExistsError'
  }
}
