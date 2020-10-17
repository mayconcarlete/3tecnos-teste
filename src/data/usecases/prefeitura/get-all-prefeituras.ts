import { IGetPrefeituraAdapter } from '@src/data/protocols/prefeitura/get-all-prefeituras'
import { TPrefeitura } from '@src/domain/prefeitura/model/prefeitura'
import { IGetAllPrefeituras } from '@src/domain/prefeitura/usecases/get-all-prefeituras'

export class GetAllPrefeituras implements IGetAllPrefeituras {
  private readonly getAllPrefeituras: IGetPrefeituraAdapter
  constructor (getAllPrefeituras: IGetPrefeituraAdapter) {
    this.getAllPrefeituras = getAllPrefeituras
  }

  async getAll (): Promise<TPrefeitura[]> {
    const prefeituras = await this.getAllPrefeituras.get()
    return prefeituras
  }
}
