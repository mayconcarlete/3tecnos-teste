import { TPrefeitura } from '@src/domain/prefeitura/model/prefeitura'
import { ICreatePrefeitura, TPrefeituraParams } from '@src/domain/prefeitura/usecases/create-prefeitura'
import { IValidator } from '@src/presentation/protocols/validator'
import { CreatePrefeituraController } from './prefeitura-controller'

const prefeituraParams: TPrefeituraParams = {
  name: 'São Mateus'
}

const prefeituraReponse: TPrefeitura = {
  id: 'HASHID',
  name: 'São Mateus',
  createdAt: new Date(),
  updatedAt: new Date()
}

class MockError extends Error {
  constructor () {
    super('MockError to test')
    this.name = 'MockError'
  }
}
class MockValidator implements IValidator {
  validate (input: any): Error | undefined {
    return undefined
  }
}

class MockCreatePrefeitura implements ICreatePrefeitura {
  async create (data: TPrefeituraParams): Promise<TPrefeitura> {
    return new Promise(resolve => resolve(prefeituraReponse))
  }
}
type SutTypes = {
  sut: CreatePrefeituraController
  mockValidator: MockValidator
  mockCreatePrefeitura: MockCreatePrefeitura

}

const makeSut = (): SutTypes => {
  const mockValidator = new MockValidator()
  const mockCreatePrefeitura = new MockCreatePrefeitura()
  const sut = new CreatePrefeituraController(mockValidator, mockCreatePrefeitura)
  return { sut, mockValidator, mockCreatePrefeitura }
}
describe('Prefeitura Controller', () => {
  test('Should call validators with correct params', async () => {
    const { sut, mockValidator } = makeSut()
    const validatorSpy = jest.spyOn(mockValidator, 'validate')
    const req = {
      body: prefeituraParams
    }
    await sut.handle(req)
    expect(validatorSpy).toHaveBeenCalledWith({ name: 'São Mateus' })
  })
  test('Should return 400 if validation fails', async () => {
    const { sut , mockValidator } = makeSut()
    jest.spyOn(mockValidator, 'validate').mockReturnValueOnce(new MockError())
    const req = {
      body: {
        name: 'invalid Name'
      }
    }
    const result = await sut.handle(req)
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual('MockError to test')
  })
  test('Should call createPrefeitura with correct params', async () => {
    const { sut, mockCreatePrefeitura } = makeSut()
    const mockCreatePrefeituraSpy = jest.spyOn(mockCreatePrefeitura, 'create')
    const req = {
      body: {
        name: 'Valid_Name'
      }
    }
    await sut.handle(req)
    expect(mockCreatePrefeituraSpy).toHaveBeenCalledWith({ name: 'Valid_Name' })
  })
  test('Should throw if createPrefeitura throws', async () => {
    const { sut, mockCreatePrefeitura } = makeSut()
    jest.spyOn(mockCreatePrefeitura, 'create').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new MockError()
      })
    })
    const req = {
      body: {
        name: 'Valid_Name'
      }
    }
    const result = await sut.handle(req)
    expect(result.statusCode).toBe(500)
    expect(result.body).toEqual(new MockError())
  })

  test('Should return bad request if prefeitura already exists in DB', async () => {
    const { sut, mockCreatePrefeitura } = makeSut()
    jest.spyOn(mockCreatePrefeitura, 'create').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))
    const req = {
      body: {
        name: 'Already_Exists_Name'
      }
    }
    const result = await sut.handle(req)
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual('Prefeitura already exists in DB')
  })

  test('Should return 200 if create prefeitura succeeds', async () => {
    const { sut } = makeSut()
    const req = {
      body: {
        name: 'Valid_Name'
      }
    }
    const result = await sut.handle(req)
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual(prefeituraReponse)
  })
})
