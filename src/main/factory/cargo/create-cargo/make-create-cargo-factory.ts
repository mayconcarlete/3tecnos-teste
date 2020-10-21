import { RequiredFields, ValidatorComposite } from '@src/validations'
import { EnumField } from '@src/validations/enum-field'

export const makeCreateCargoValidators = (): ValidatorComposite => {
  const validators = []
  const requiredFields = ['prefeituraId', 'cargoType', 'codigo', 'cargoNome', 'salario', 'vagasTotais', 'vagasPreenchidas']
  for (const field of requiredFields) {
    validators.push(new RequiredFields(field))
  }
  const pattern = /^comissionado$|^efetivo$/i
  const fieldName = 'cargoType'
  const enumField = new EnumField(pattern,fieldName)
  validators.push(enumField)
  return new ValidatorComposite(validators)
}
