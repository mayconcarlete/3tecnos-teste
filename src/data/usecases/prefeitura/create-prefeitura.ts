import { ILoadPrefeituraByName } from '@src/data/protocols/prefeitura/load-prefeitura'
import { TPrefeitura } from '@src/domain/prefeitura/model/prefeitura'
import { ICreatePrefeitura, TPrefeituraParams } from '@src/domain/prefeitura/usecases/create-prefeitura'

export class CreatePrefeitura implements ICreatePrefeitura {
 
  private readonly loadPrefeituraByName: ILoadPrefeituraByName
 
  constructor (loadPrefeituraByName: ILoadPrefeituraByName) {
    this.loadPrefeituraByName = loadPrefeituraByName
  }

  async create (data: TPrefeituraParams): Promise<TPrefeitura | undefined> {
    const loadPrefeituraByName = await this.loadPrefeituraByName.load(data.name)
    return new Promise(resolve => resolve(undefined))
  }
}
