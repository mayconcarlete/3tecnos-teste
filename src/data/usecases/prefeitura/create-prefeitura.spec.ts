import { ILoadPrefeituraByName } from '@src/data/protocols/prefeitura/load-prefeitura'
import { TPrefeitura } from '@src/domain/prefeitura/model/prefeitura'
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

type SutTypes = {
  sut: CreatePrefeitura
  mockLoadPrefeituraByName: MockLoadPrefeitura
}
const makeSut = (): SutTypes => {
  const mockLoadPrefeituraByName = new MockLoadPrefeitura()
  const sut = new CreatePrefeitura(mockLoadPrefeituraByName)
  return {
    sut,
    mockLoadPrefeituraByName
  }
}
describe('Create Prefeitura', () => {
  test('Should call loadPrefeitura with correct params', async () => {
    const { sut, mockLoadPrefeituraByName } = makeSut()
    const loadPrefeituraSpy = jest.spyOn(mockLoadPrefeituraByName, 'load')
    await sut.create({ name: 'São Mateus' })
    expect(loadPrefeituraSpy).toHaveBeenCalledWith('São Mateus')
  })
  test('Should return undefined if prefeitura already exists on DB', async () => {
    const { sut } = makeSut()
    const result = await sut.create({ name: 'São Mateus' })
    expect(result).toBe(undefined)
  })
})
