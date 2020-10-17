import { MissingParamError } from './errors/missing-param-error'
import { RequiredFields } from './required-fields'
type SutTypes = {
  sut: RequiredFields
}
const fieldName = 'required_field'

const makeSut = (): SutTypes => {
  const sut = new RequiredFields(fieldName)
  return { sut }
}
describe('Require Fields', () => {
  test('Should call validate with correct params', () => {
    const { sut } = makeSut()
    const validateSpy = jest.spyOn(sut, 'validate')
    const body = {
      [fieldName]: 'any_value'
    }
    sut.validate(body)
    expect(validateSpy).toHaveBeenCalledWith({ [fieldName]: 'any_value' })
  })
  test('Should return an MissingParamError if validation fails', () => {
    const { sut } = makeSut()
    const result = sut.validate({ invalid_param: 'any_value' })
    expect(result).toEqual(new MissingParamError(fieldName))
  })
  test('Should return undefined if validation succeeds', () => {
    const { sut } = makeSut()
    const body = {
      [fieldName]: 'any_value'
    }
    const result = sut.validate(body)
    expect(result).toBeFalsy()
  })
})
