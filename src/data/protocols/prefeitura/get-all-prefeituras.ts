import { TPrefeitura } from '@src/domain/prefeitura/model/prefeitura'

export interface IGetPrefeituraAdapter{
  get: () => Promise<TPrefeitura []>
}
