export class LengthError extends Error {
  constructor (fieldName: string) {
    super(`Invalid Length Size: ${fieldName}`)
    this.name = 'LengthError'
  }
}
