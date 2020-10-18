import { IGetPrefeituraAdapter } from '@src/data/protocols/prefeitura/get-all-prefeituras'
import { TPrefeitura } from '@src/domain/prefeitura/model/prefeitura'
import { IGetAllPrefeituras } from '@src/domain/prefeitura/usecases/get-all-prefeituras'

export class GetAllPrefeituras implements IGetAllPrefeituras {
  private readonly getAllPrefeiturasAdapter: IGetPrefeituraAdapter
  constructor (getAllPrefeiturasAdapter: IGetPrefeituraAdapter) {
    this.getAllPrefeiturasAdapter = getAllPrefeiturasAdapter
  }

  async getAll (): Promise<TPrefeitura[]> {
    const prefeituras = await this.getAllPrefeiturasAdapter.get()
    return prefeituras
  }
}
