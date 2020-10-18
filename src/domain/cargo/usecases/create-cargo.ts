import { TCargo, TCargoParams } from '../models/cargo'

export interface ICreateCargo{
  create: (data: TCargoParams) => Promise<TCargo | undefined>
}
