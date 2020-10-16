import { TPrefeitura } from '../model/prefeitura'

export type TPrefeituraParams = {
  name: string
}

export interface ICreatePrefeitura{
  create: (data: TPrefeituraParams) => Promise<TPrefeitura | undefined>
}
