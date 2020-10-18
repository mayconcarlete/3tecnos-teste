/* eslint-disable @typescript-eslint/no-floating-promises */
import { ICreatePrefeituraAdapter } from '@src/data/protocols/prefeitura/create-prefeitura'
import { IGetPrefeituraAdapter } from '@src/data/protocols/prefeitura/get-all-prefeituras'
import { ILoadPrefeituraByName } from '@src/data/protocols/prefeitura/load-prefeitura'
import { TPrefeitura } from '@src/domain/prefeitura/model/prefeitura'
import { TPrefeituraParams } from '@src/domain/prefeitura/usecases/create-prefeitura'
import Prefeitura, { PrefeituraModel } from '../models/prefeitura'

export class PrefeituraDbAdapter implements ILoadPrefeituraByName, ICreatePrefeituraAdapter, IGetPrefeituraAdapter {
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
      return this.remapId(loadPrefeitura)
    }
    return undefined
  }

  async get (): Promise<TPrefeitura[]> {
    const prefeituras = await Prefeitura.find()
    return prefeituras.map(prefeitura => this.remapId(prefeitura))
  }

  async removeAll (): Promise<void> {
    await Prefeitura.deleteMany({})
  }

  remapId (prefeituraMongoDb: PrefeituraModel): TPrefeitura {
    return Object.assign({},
      {
        id: prefeituraMongoDb._id,
        name: prefeituraMongoDb.name,
        updatedAt: prefeituraMongoDb.updatedAt,
        createdAt: prefeituraMongoDb.createdAt
      })
  }
}
