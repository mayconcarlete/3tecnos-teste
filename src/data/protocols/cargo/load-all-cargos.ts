import { TCargo } from '@src/domain/cargo/models/cargo'

export interface ILoadAllCargosAdapter{
  loadAll: () => Promise<TCargo[]|[]>
}
