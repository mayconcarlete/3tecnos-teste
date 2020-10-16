import { LengthSize } from '@src/validations/length-size'
import { ValidatorComposite } from '@src/validations/validator-composite'

export const makeCreatePrefeituraValidators = (): ValidatorComposite => {
  const validators = []
  const fieldName = 'name'
  const min = 3
  const max = 30
  validators.push(new LengthSize(fieldName, min, max))
  return new ValidatorComposite(validators)
}
