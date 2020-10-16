import { TPrefeitura } from '@src/domain/prefeitura/model/prefeitura'

export interface ILoadPrefeituraByName{
  load: (name: string) => Promise<TPrefeitura |undefined>
}
