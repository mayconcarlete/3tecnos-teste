import { ILoadAllCargosAdapter } from '@src/data/protocols/cargo/load-all-cargos'
import { TCargo } from '@src/domain/cargo/models/cargo'
import { GetAllCargos } from './get-all-cargos'

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
class MockLoadCargoAdapter implements ILoadAllCargosAdapter {
  async loadAll (): Promise<TCargo[] | []> {
    return new Promise(resolve => resolve(mockArrayResult))
  }
}

type SutTypes = {
  sut: GetAllCargos
  loadCargosAdapter: MockLoadCargoAdapter
}
const makeSut = (): SutTypes => {
  const loadCargosAdapter = new MockLoadCargoAdapter()
  const sut = new GetAllCargos(loadCargosAdapter)
  return { sut, loadCargosAdapter }
}
describe('GetAllCargos', () => {
  test('should throw if load cargos throw', async () => {
    const { sut, loadCargosAdapter } = makeSut()
    jest.spyOn(loadCargosAdapter, 'loadAll').mockImplementationOnce(async () => {
      return new Promise(() => {
        throw new Error('LoadCargosAdapter throws')
      })
    })
    await expect(sut.get()).rejects.toThrow()
  })
  test('Should return an array of cargos on success', async () => {
    const { sut } = makeSut()
    const result = await sut.get()
    expect(result).toEqual(mockArrayResult)
  })
})
