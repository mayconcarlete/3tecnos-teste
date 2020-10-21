import { TCargo, TCargoParams } from '@src/domain/cargo/models/cargo'

export interface ICreateCargoAdapter{
  add: (data: TCargoParams) => Promise<TCargo>
}
