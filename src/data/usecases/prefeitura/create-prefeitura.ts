import { ICreatePrefeituraAdapter } from '@src/data/protocols/prefeitura/create-prefeitura'
import { ILoadPrefeituraByName } from '@src/data/protocols/prefeitura/load-prefeitura'
import { TPrefeitura } from '@src/domain/prefeitura/model/prefeitura'
import { ICreatePrefeitura, TPrefeituraParams } from '@src/domain/prefeitura/usecases/create-prefeitura'

export class CreatePrefeitura implements ICreatePrefeitura {
  private readonly loadPrefeituraByName: ILoadPrefeituraByName
  private readonly createPrefeituraAdapter: ICreatePrefeituraAdapter

  constructor (loadPrefeituraByName: ILoadPrefeituraByName, createPrefeituraAdapter:ICreatePrefeituraAdapter) {
    this.loadPrefeituraByName = loadPrefeituraByName
    this.createPrefeituraAdapter = createPrefeituraAdapter
  }

  async create (data: TPrefeituraParams): Promise<TPrefeitura | undefined> {
    const loadPrefeituraByName = await this.loadPrefeituraByName.load(data.name)
    if (!loadPrefeituraByName) {
      const newPrefeitura = await this.createPrefeituraAdapter.add(data)
      return newPrefeitura
    }
    return undefined
  }
}
