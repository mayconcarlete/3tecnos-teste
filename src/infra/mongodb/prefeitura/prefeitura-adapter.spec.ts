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
  afterAll(async () => {
    const mongoConfig = new MongoConfig()
    await mongoConfig.disconnect()
  })
  test('Should call add with correct params', async () => {
    const { sut } = makeSut()
    const addSpy = jest.spyOn(sut, 'add')
    await sut.add({ name: 'any_value' })
    expect(addSpy).toHaveBeenCalledWith({ name: 'any_value' })
  })
  test('Should call load with correct params', async () => {
    const { sut } = makeSut()
    const loadSpy = jest.spyOn(sut, 'load')
    await sut.load('any_value')
    expect(loadSpy).toHaveBeenCalledWith('any_value')
  })
})
