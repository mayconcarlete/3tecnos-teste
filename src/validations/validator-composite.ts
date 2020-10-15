import { IValidator } from '@src/presentation/protocols/validator'

export class ValidatorComposite implements IValidator {
  private readonly validators
  constructor (validators: IValidator[]) {
    this.validators = validators
  }

  validate (input: any): Error | undefined {
    for (const validator of this.validators) {
      const error = validator.validate(input)
      if (error) {
        return error
      }
    }
  }
}
