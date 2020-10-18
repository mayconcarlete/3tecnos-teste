import { TCargo, TCargoParams } from '../cargo'

export interface ICreateCargo{
  create: (data: TCargoParams) => Promise<TCargo | undefined>
}
