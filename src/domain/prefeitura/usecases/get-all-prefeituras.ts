import { TPrefeitura } from '../model/prefeitura'

export interface IGetAllPrefeituras{
  getAll: () => Promise<TPrefeitura[]>
}
