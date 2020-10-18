import { ICreatePrefeituraAdapter } from '@src/data/protocols/prefeitura/create-prefeitura'
import { ILoadPrefeituraByName } from '@src/data/protocols/prefeitura/load-prefeitura'
import { TPrefeitura } from '@src/domain/prefeitura/model/prefeitura'
import { TPrefeituraParams } from '@src/domain/prefeitura/usecases/create-prefeitura'
import { CreatePrefeitura } from './create-prefeitura'

const prefeituraReponse: TPrefeitura = {
  id: 'HASHID',
  name: 'São Mateus',
  createdAt: new Date(),
  updatedAt: new Date()
}
export class MockLoadPrefeitura implements ILoadPrefeituraByName {
  async load (name: string): Promise<TPrefeitura> {
    return new Promise(resolve => resolve(prefeituraReponse))
  }
}
export class MockAddPrefeituraAdapter implements ICreatePrefeituraAdapter {
  async add (data: TPrefeituraParams): Promise<TPrefeitura> {
    return new Promise(resolve => resolve(prefeituraReponse))
  }
}
type SutTypes = {
  sut: CreatePrefeitura
  mockLoadPrefeituraByName: MockLoadPrefeitura
  addPrefeituraAdapter: MockAddPrefeituraAdapter
}
const makeSut = (): SutTypes => {
  const mockLoadPrefeituraByName = new MockLoadPrefeitura()
  const addPrefeituraAdapter = new MockAddPrefeituraAdapter()
  const sut = new CreatePrefeitura(mockLoadPrefeituraByName, addPrefeituraAdapter)
  return {
    sut,
    mockLoadPrefeituraByName,
    addPrefeituraAdapter
  }
}
describe('Create Prefeitura', () => {
  test('Should call loadPrefeitura with correct params', async () => {
    const { sut, mockLoadPrefeituraByName } = makeSut()
    const loadPrefeituraSpy = jest.spyOn(mockLoadPrefeituraByName, 'load')
    await sut.create({ name: 'São Mateus' })
    expect(loadPrefeituraSpy).toHaveBeenCalledWith('São Mateus')
  })
  test('Should throw if addPrefeitura throws', async () => {
    const { sut, addPrefeituraAdapter, mockLoadPrefeituraByName } = makeSut()
    jest.spyOn(mockLoadPrefeituraByName, 'load').mockImplementationOnce(async () => {
      return new Promise(resolve => resolve(undefined)
      )
    })

    jest.spyOn(addPrefeituraAdapter, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    await expect(sut.create({ name: 'any_name' })).rejects.toThrow()
  })
  test('Should return undefined if prefeitura already exists on DB', async () => {
    const { sut } = makeSut()
    const result = await sut.create({ name: 'São Mateus' })
    expect(result).toBe(undefined)
  })
  test('Should call addPrefeituraAdapter with correct params', async () => {
    const { sut, mockLoadPrefeituraByName } = makeSut()
    jest.spyOn(mockLoadPrefeituraByName, 'load').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))
    const result = await sut.create({ name: 'São Mateus' })
    expect(result).toEqual(prefeituraReponse)
  })
  test('Should throw if addPrefeituraAdapter throws', async () => {
    const { sut, addPrefeituraAdapter, mockLoadPrefeituraByName } = makeSut()
    jest.spyOn(mockLoadPrefeituraByName, 'load').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))
    jest.spyOn(addPrefeituraAdapter, 'add').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error()
      })
    })
    await expect(sut.create({ name: 'any_name' })).rejects.toThrow()
  })
  test('Should return a Prefeitura if addAdapter succeeds', async () => {
    const { sut, mockLoadPrefeituraByName } = makeSut()
    jest.spyOn(mockLoadPrefeituraByName, 'load').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))
    const result = await sut.create({ name: 'São Mateus' })
    expect(result).toEqual(prefeituraReponse)
  })
})
