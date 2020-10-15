import { IValidator } from '@src/presentation/protocols/validator'
import { LengthError } from './errors/length-error'
import { LengthSize } from './length-size'
import { ValidatorComposite } from './validator-composite'

type SutTypes = {
  sut: ValidatorComposite
}

class MockError implements IValidator {
  validate (input: any): Error | undefined {
    return undefined
  }
}

const makeSut = (): SutTypes => {
  const validators = []

  validators.push(new MockError())
  validators.push(new LengthSize('field2',3, 8))

  const sut = new ValidatorComposite(validators)
  return { sut }
}

describe('Validator Composite', () => {
  test('Should call validate with correct params', () => {
    const { sut } = makeSut()
    const validateSpy = jest.spyOn(sut, 'validate')
    const body = {
      field1: 'any',
      field2: 'any'
    }
    sut.validate(body)
    expect(validateSpy).toHaveBeenCalledWith(body)
  })
  test('Should return an error if an error was detected', () => {
    const { sut } = makeSut()
    const body = {
      field1: 'invalid',
      field2: 'an'
    }
    const result = sut.validate(body)
    expect(result).toEqual(new LengthError('field2'))
  })
  test('Should be falsy if validation succeeds', () => {
    const { sut } = makeSut()
    const body = {
      field1: 'valid',
      field2: 'valid'
    }
    const result = sut.validate(body)
    expect(result).toBeFalsy()
  })
})
