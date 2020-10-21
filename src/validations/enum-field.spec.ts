import { EnumField } from './enum-field'

const req = {
  name: 'São Mateus',
  prefeituraId: '5f8f59297bb2572ff8aacb32',
  cargoType: 'COMISSIONADO',
  codigo: 1233147556,
  cargoNome: 'Merendeiragz',
  salario: 1234.12,
  vagasTotais: 20,
  vagasPreenchidas: 10
}
const reqError = {
  name: 'São Mateus',
  prefeituraId: '5f8f59297bb2572ff8aacb32',
  cargoType: 'invalid_cargo',
  codigo: 1233147556,
  cargoNome: 'Merendeiragz',
  salario: 1234.12,
  vagasTotais: 20,
  vagasPreenchidas: 10
}

const pattern = /^comissionado$|^efetivo$/i
const fieldName = 'cargoType'

type SutTypes = {
  sut: EnumField
}

const makeSut = (): SutTypes => {
  const sut = new EnumField(pattern, fieldName)
  return { sut }
}
describe('EnumField', () => {
  test('Should call validate with correct params', () => {
    const { sut } = makeSut()
    const validateSpy = jest.spyOn(sut, 'validate')
    sut.validate(req)
    expect(validateSpy).toHaveBeenCalledWith(req)
  })
  test('Should return new Error if validator fails', () => {
    const { sut } = makeSut()
    const result = sut.validate(reqError)
    expect(result).toEqual(new Error('Invalid enum param: cargoType, only accepts /^comissionado$|^efetivo$/i'))
  })
  test('should return undefined if validator succeeds', () => {
    const { sut } = makeSut()
    const result = sut.validate(req)
    expect(result).toBeFalsy()
  })
})
