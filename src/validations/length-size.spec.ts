import { LengthError } from './errors/length-error'
import { LengthSize } from './length-size'

interface SutTypes {
  sut: LengthSize
}

const makeSut = (): SutTypes => {
  const fieldName = 'test'
  const min = 3
  const max = 6
  const sut = new LengthSize(fieldName, min, max)
  return { sut }
}
describe('Length Size', () => {
  test('Should return an error if field are shorter then minimun', () => {
    const { sut } = makeSut()
    const body = {
      test: '1s'
    }
    const result = sut.validate(body)
    expect(result).toEqual(new LengthError('test'))
  })
  test('Should return an error if field are bigger then maximum', () => {
    const { sut } = makeSut()
    const body = {
      test: '1234567avgh'
    }
    const result = sut.validate(body)
    expect(result).toEqual(new LengthError('test'))
  })
  test('Should return undefined on happy case', () => {
    const { sut } = makeSut()
    const body = {
      test: 'valid'
    }
    const result = sut.validate(body)
    expect(result).toBeFalsy()
  })
})
