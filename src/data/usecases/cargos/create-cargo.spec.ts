import { ICreateCargoAdapter } from '@src/data/protocols/cargo/create-cargo'
import { ILoadCargoByCodigoAdapter, TLoadCargoByCodigoParams } from '@src/data/protocols/cargo/load-cargo-by-codigo'
import { TCargo,TCargoParams } from '@src/domain/cargo/models/cargo'
import { CreateCargo } from './create-cargo'
const mockRequest: TCargoParams = {
  prefeituraId: 'HASH_PREFEITURA_ID',
  cargoNome: 'MockedCargo',
  cargoType: 'COMISSIONADO',
  codigo: 1234,
  salario: 2000.99,
  vagasPreenchidas: 0,
  vagasTotais: 100
}
const mockResult: TCargo = {
  id: 'HASH_ID',
  prefeituraId: 'HASH_PREFEITURA_ID',
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

class MockLoadCargoByCodigo implements ILoadCargoByCodigoAdapter {
  async get (data: TLoadCargoByCodigoParams): Promise<TCargo | undefined> {
    return new Promise(resolve => resolve(undefined))
  }
}

class MockCreateCargoAdapter implements ICreateCargoAdapter {
  async add (data: TCargoParams): Promise<TCargo> {
    return new Promise(resolve => resolve(mockResult))
  }
}

type SutTypes = {
  sut: CreateCargo
  loadCargoByCodigo: ILoadCargoByCodigoAdapter
  createCargoAdapter: ICreateCargoAdapter
}

const makeSut = (): SutTypes => {
  const createCargoAdapter = new MockCreateCargoAdapter()
  const loadCargoByCodigo = new MockLoadCargoByCodigo()
  const sut = new CreateCargo(loadCargoByCodigo, createCargoAdapter)
  return { sut, loadCargoByCodigo, createCargoAdapter }
}

describe('Create Cargo', () => {
  test('Should call loadCargoByCodigo with correct params', async () => {
    const { sut, loadCargoByCodigo } = makeSut()
    const loadCargoSpy = jest.spyOn(loadCargoByCodigo, 'get')
    await sut.create(mockRequest)
    expect(loadCargoSpy).toHaveBeenCalledWith({ codigo: 1234,prefeituraId: 'HASH_PREFEITURA_ID' })
  })
  test('Should call createCargoAdapter with correct params', async () => {
    const { sut, createCargoAdapter } = makeSut()
    const createCargoSpy = jest.spyOn(createCargoAdapter, 'add')
    await sut.create(mockRequest)
    expect(createCargoSpy).toHaveBeenCalledWith(mockRequest)
  })
  test('Should throw if loadCargoByCodigo throws', async () => {
    const { sut, loadCargoByCodigo } = makeSut()
    jest.spyOn(loadCargoByCodigo, 'get').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error()
      })
    })
    await expect(sut.create(mockRequest)).rejects.toThrow()
  })
  test('Should throw if createCargoAdapter throws', async () => {
    const { sut, createCargoAdapter } = makeSut()
    jest.spyOn(createCargoAdapter, 'add').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error()
      })
    })
    await expect(sut.create(mockRequest)).rejects.toThrow()
  })
  test('Should return undefined if loadCargoByCodigo return a Cargo', async () => {
    const { sut, loadCargoByCodigo } = makeSut()
    jest.spyOn(loadCargoByCodigo, 'get').mockReturnValueOnce(new Promise(resolve => resolve(mockResult)))
    const result = await sut.create(mockRequest)
    expect(result).toBeFalsy()
  })
  test('Should return cargo if createCargo succeeds', async () => {
    const { sut } = makeSut()
    const result = await sut.create(mockRequest)
    expect(result).toEqual(mockResult)
  })
})
