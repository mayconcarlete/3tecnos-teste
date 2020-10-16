/* eslint-disable @typescript-eslint/no-floating-promises */
import { ICreatePrefeituraAdapter } from '@src/data/protocols/prefeitura/create-prefeitura'
import { ILoadPrefeituraByName } from '@src/data/protocols/prefeitura/load-prefeitura'
import { TPrefeitura } from '@src/domain/prefeitura/model/prefeitura'
import { TPrefeituraParams } from '@src/domain/prefeitura/usecases/create-prefeitura'
import Prefeitura from '../models/prefeitura'

export class PrefeituraDbAdapter implements ILoadPrefeituraByName, ICreatePrefeituraAdapter {
  async add (data: TPrefeituraParams): Promise<TPrefeitura | undefined> {
    const createPrefeitura = await Prefeitura.create<any>(data)
    if (createPrefeitura) {
      return Object.assign({},
        {
          id: createPrefeitura._id,
          name: createPrefeitura.name,
          updatedAt: createPrefeitura.updatedAt,
          createdAt: createPrefeitura.createdAt
        })
    }
    return undefined
  }

  async load (name: string): Promise<TPrefeitura|undefined> {
    const loadPrefeitura = await Prefeitura.findOne({ name })
    if (loadPrefeitura) {
      return Object.assign({},
        {
          id: loadPrefeitura._id,
          name: loadPrefeitura.name,
          updatedAt: loadPrefeitura.updatedAt,
          createdAt: loadPrefeitura.createdAt
        })
    }
    return undefined
  }
}
