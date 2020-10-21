import { IValidator } from '@src/presentation/protocols/validator'

export class EnumField implements IValidator {
  private readonly pattern: RegExp
  private readonly fieldName: string

  constructor (pattern: RegExp, fieldName: string) {
    this.pattern = pattern
    this.fieldName = fieldName
  }

  validate (input: any): Error | undefined {
    if (input[this.fieldName].search(this.pattern) === -1) {
      return new Error(`Invalid enum param: ${this.fieldName}, only accepts ${this.pattern}`)
    }
    return undefined
  }
}
