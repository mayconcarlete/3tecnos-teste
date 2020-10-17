import { IGetPrefeituraAdapter } from '@src/data/protocols/prefeitura/get-all-prefeituras'
import { TPrefeitura } from '@src/domain/prefeitura/model/prefeitura'
import { GetAllPrefeituras } from './get-all-prefeituras'

const prefeituraReponse: TPrefeitura = {
  id: 'HASH_ID',
  name: 'São Mateus',
  createdAt: new Date(),
  updatedAt: new Date()
}
class MockGetPrefeituraAdapter implements IGetPrefeituraAdapter {
  async get (): Promise<TPrefeitura[]> {
    const mockArr = [prefeituraReponse,prefeituraReponse,prefeituraReponse]
    return new Promise(resolve => resolve(mockArr))
  }
}

type SutTypes = {
  sut: GetAllPrefeituras
  getAllPrefeiturasAdapter: MockGetPrefeituraAdapter
}

const makeSut = (): SutTypes => {
  const getAllPrefeiturasAdapter = new MockGetPrefeituraAdapter()
  const sut = new GetAllPrefeituras(getAllPrefeiturasAdapter)
  return { sut, getAllPrefeiturasAdapter }
}

describe('GetAllPrefeituras', () => {
  test('should throw if get throws', async () => {
    const { sut, getAllPrefeiturasAdapter } = makeSut()
    jest.spyOn(getAllPrefeiturasAdapter, 'get').mockReturnValueOnce(new Promise(() => { throw new Error() }))
    await expect(sut.getAll()).rejects.toThrow()
  })
})
