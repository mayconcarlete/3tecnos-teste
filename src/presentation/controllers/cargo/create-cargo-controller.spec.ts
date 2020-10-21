import { TCargoParams, TCargo } from '@src/domain/cargo/models/cargo'
import { ICreateCargo } from '@src/domain/cargo/usecases/create-cargo'
import { AlreadyExistsError } from '../../errors/already-exists-error'
import { THttpRequest } from '@src/presentation/models/http-models'
import { IValidator } from '@src/presentation/protocols/validator'
import { CreateCargoController } from './create-cargo-controller'
import { TPrefeitura } from '@src/domain/prefeitura/model/prefeitura'

const req: THttpRequest = {
  body: {
    prefeituraId: 'HASH_PREFEITURA_ID',
    cargoNome: 'MockedCargo',
    cargoType: 'COMISSIONADO',
    codigo: 1234,
    salario: 2000.99,
    vagasPreenchidas: 0,
    vagasTotais: 100
  }
}
const prefeituraReponse: TPrefeitura = {
  id: 'HASHID',
  name: 'São Mateus',
  createdAt: new Date(),
  updatedAt: new Date()
}

const mockResult: TCargo = {
  id: 'HASH_ID',
  prefeituraId: prefeituraReponse,
  cargoNome: 'MockedCargo',
  cargoType: 'COMISSIONADO',
  codigo: 1234,
  prefeitura: { id: 'HASH_PREFEITURA_ID', name: 'any_prefeitura', createdAt: new Date(), updatedAt: new Date() },
  salario: 2000.99,
  vagasPreenchidas: 0,
  vagasTotais: 100,
  createdAt: new Date(),
  updatedAt: new Date()
}

class MockValidator implements IValidator {
  validate (input: any): Error | undefined {
    return undefined
  }
}

class MockCreateCargo implements ICreateCargo {
  async create (data: TCargoParams): Promise<TCargo | undefined> {
    return new Promise(resolve => resolve(mockResult))
  }
}

type SutTypes = {
  validator: MockValidator
  createCargo: MockCreateCargo
  sut: CreateCargoController
}

const makeSut = (): SutTypes => {
  const validator = new MockValidator()
  const createCargo = new MockCreateCargo()
  const sut = new CreateCargoController(validator, createCargo)
  return { sut, validator, createCargo }
}

describe('CreateCargoController', () => {
  test('Should call validator with correct param', async () => {
    const { sut, validator } = makeSut()
    const validatorsSpy = jest.spyOn(validator, 'validate')
    await sut.handle(req)
    expect(validatorsSpy).toHaveBeenCalledWith(req.body)
  })
  test('Should return an error if validation fails', async () => {
    const { sut, validator } = makeSut()
    jest.spyOn(validator, 'validate').mockReturnValueOnce(new Error('MockError'))

    const result = await sut.handle(req)
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual('MockError')
  })
  test('Should call createCargo with correct param', async () => {
    const { sut, createCargo } = makeSut()
    const createCargoSpy = jest.spyOn(createCargo, 'create')
    await sut.handle(req)
    expect(createCargoSpy).toHaveBeenCalledWith(req.body)
  })
  test('Should return undefined if create cargo fails', async () => {
    const { sut, createCargo } = makeSut()
    jest.spyOn(createCargo, 'create').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))

    const result = await sut.handle(req)
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new AlreadyExistsError('cargo').message)
  })
  test('Should return 500  if createCargo throws', async () => {
    const { sut, createCargo } = makeSut()
    jest.spyOn(createCargo, 'create').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error()
      })
    })
    const result = await sut.handle(req)
    expect(result.statusCode).toBe(500)
  })
  test('Should return 200 if create cargo succeeds', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(req)
    expect(result.statusCode).toBe(201)
    expect(result.body).toEqual(mockResult)
  })
})
