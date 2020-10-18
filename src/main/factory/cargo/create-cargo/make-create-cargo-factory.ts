import { RequiredFields, ValidatorComposite } from '@src/validations'

export const makeCreateCargoValidators = (): ValidatorComposite => {
  const validators = []
  const requiredFields = ['prefeituraId', 'cargoType', 'codigo', 'cargoNome', 'salario', 'vagasTotais', 'vagasPreenchidas']
  for (const field of requiredFields) {
    validators.push(new RequiredFields(field))
  }
  return new ValidatorComposite(validators)
}
