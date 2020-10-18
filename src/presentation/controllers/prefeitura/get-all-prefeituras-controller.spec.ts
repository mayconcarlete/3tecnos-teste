import { TPrefeitura } from '@src/domain/prefeitura/model/prefeitura'
import { IGetAllPrefeituras } from '@src/domain/prefeitura/usecases/get-all-prefeituras'
import { GetAllPrefeiturasController } from './get-all-prefeituras-controller'
const prefeituraReponse: TPrefeitura = {
  id: 'HASH_ID',
  name: 'São Mateus',
  createdAt: new Date(),
  updatedAt: new Date()
}
const mockArr = [prefeituraReponse,prefeituraReponse,prefeituraReponse]

class MockGetAllPrefeituras implements IGetAllPrefeituras {
  async getAll (): Promise<TPrefeitura[]> {
    return new Promise(resolve => resolve(mockArr))
  }
}

type SutTypes = {
  sut: GetAllPrefeiturasController
  getAllPrefeituras: MockGetAllPrefeituras
}

const makeSut = (): SutTypes => {
  const getAllPrefeituras = new MockGetAllPrefeituras()
  const sut = new GetAllPrefeiturasController(getAllPrefeituras)
  return { sut, getAllPrefeituras }
}
describe('GetAllPrefeiturasController', () => {
  test('Should return 500 if getAllPrefeituras throw', async () => {
    const { sut, getAllPrefeituras } = makeSut()
    jest.spyOn(getAllPrefeituras, 'getAll').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const req = {}
    const result = await sut.handle(req)
    expect(result.statusCode).toBe(500)
    expect(result.body).toEqual(new Error())
  })
})
