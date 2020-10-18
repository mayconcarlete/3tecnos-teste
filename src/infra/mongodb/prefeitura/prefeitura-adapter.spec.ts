/* eslint-disable @typescript-eslint/no-floating-promises */
import { PrefeituraDbAdapter } from './prefeitura-adapter'
import { MongoConfig } from '../index'

type SutTypes = {
  sut: PrefeituraDbAdapter
}

const makeSut = (): SutTypes => {
  const sut = new PrefeituraDbAdapter()
  return { sut }
}
describe('MongoAdapter', () => {
  beforeAll(async () => {
    const mongoConfig = new MongoConfig()
    await mongoConfig.connect()
  })
  beforeEach(async () => {
    const { sut } = makeSut()
    await sut.removeAll()
  })
  afterAll(async () => {
    const mongoConfig = new MongoConfig()
    const { sut } = makeSut()
    await sut.removeAll()
    await mongoConfig.disconnect()
  })
  test('Should call add with correct params', async () => {
    const { sut } = makeSut()
    const addSpy = jest.spyOn(sut, 'add')
    await sut.add({ name: 'any_value' })
    expect(addSpy).toHaveBeenCalledWith({ name: 'any_value' })
  })
  test('Should return an prefeitura if add succeed', async () => {
    const { sut } = makeSut()
    const result = await sut.add({ name: 'valid_name' })
    expect(result).toBeTruthy()
  })
  test('Should call load with correct params', async () => {
    const { sut } = makeSut()
    const loadSpy = jest.spyOn(sut, 'load')
    await sut.load('any_value')
    expect(loadSpy).toHaveBeenCalledWith('any_value')
  })
  test('Should retun all prefeituras with get method', async () => {
    const { sut } = makeSut()
    const result = await sut.get()
    expect(result).toBeTruthy()
  })
})
