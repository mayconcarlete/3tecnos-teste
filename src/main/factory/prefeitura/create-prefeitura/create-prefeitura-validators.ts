import { LengthSize, RequiredFields,ValidatorComposite } from '@src/validations'

export const makeCreatePrefeituraValidators = (): ValidatorComposite => {
  const validators = []
  const fieldName = 'name'

  const requiredField = 'name'
  validators.push(new RequiredFields(requiredField))

  const min = 3
  const max = 30
  validators.push(new LengthSize(fieldName, min, max))

  return new ValidatorComposite(validators)
}
