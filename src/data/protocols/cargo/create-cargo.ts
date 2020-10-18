import { TCargo, TCargoParams } from '@src/domain/cargo/cargo'

export interface ICreateCargoAdapter{
  add: (data: TCargoParams) => Promise<TCargo>
}
