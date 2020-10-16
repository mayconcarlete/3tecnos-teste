import { TPrefeitura } from '@src/domain/prefeitura/model/prefeitura'
import { TPrefeituraParams } from '@src/domain/prefeitura/usecases/create-prefeitura'

export interface ICreatePrefeituraAdapter{
  add: (data: TPrefeituraParams) => Promise<TPrefeitura>
}
