import { TCargo } from '@src/domain/cargo/models/cargo'
import { IgetAllCargos } from '@src/domain/cargo/usecases/get-all-cargos'
import { GetAllCargosController } from './get-all-cargos-controller'

const mockResult: TCargo = {
  id: 'HASH_ID',
  prefeituraId: 'HASH_PREFEITURA_ID',
  cargoNome: 'MOCKEDCARGO',
  cargoType: 'COMISSIONADO',
  codigo: 1234,
  prefeitura: { id: 'HASH_PREFEITURA_ID', name: 'any_prefeitura', createdAt: new Date(), updatedAt: new Date() },
  salario: 2000.99,
  vagasPreenchidas: 0,
  vagasTotais: 100,
  createdAt: new Date(),
  updatedAt: new Date()
}
const mockArrayResult = [mockResult,mockResult]

class MockLoadCargosAdapter implements IgetAllCargos {
  async get (): Promise<TCargo[] | []> {
    return new Promise(resolve => resolve(mockArrayResult))
  }
}

type SutTypes = {
  sut: GetAllCargosController
  loadCargosAdapter: IgetAllCargos
}
const makeSut = (): SutTypes => {
  const loadCargosAdapter = new MockLoadCargosAdapter()
  const sut = new GetAllCargosController(loadCargosAdapter)
  return { sut, loadCargosAdapter }
}
describe('GetAllCargosController', () => {
  test('should return 500 if load cargos throw', async () => {
    const { sut, loadCargosAdapter } = makeSut()
    jest.spyOn(loadCargosAdapter, 'get').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error()
      })
    })
    const result = await sut.handle({})
    expect(result.statusCode).toBe(500)
  })
  test('should return an array of cargos in success', async () => {
    const { sut } = makeSut()
    const result = await sut.handle({})
    expect(result.body).toEqual(mockArrayResult)
  })
})
