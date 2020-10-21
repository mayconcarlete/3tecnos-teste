import { TCargo } from '../models/cargo'

export interface IgetAllCargos{
  get: () => Promise<TCargo[]| []>
}
