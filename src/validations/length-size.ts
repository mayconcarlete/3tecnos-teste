import { IValidator } from '@src/presentation/protocols/validator'
import { LengthError } from './errors/length-error'

export class LengthSize implements IValidator {
  private readonly fieldName: string
  private readonly min: number
  private readonly max: number

  constructor (fieldName: string, min: number, max: number) {
    this.fieldName = fieldName
    this.min = min
    this.max = max
  }

  validate (body: any): Error | undefined {
    console.log(body)
    if (body[this.fieldName].length < this.min || body[this.fieldName].length > this.max) {
      return new LengthError(this.fieldName)
    }
    return undefined
  }
}
