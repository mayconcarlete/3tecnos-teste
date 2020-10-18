import { TCargo } from '@src/domain/cargo/models/cargo'

export type TLoadCargoByCodigoParams = {
  prefeituraId: string
  codigo: number
}

export interface ILoadCargoByCodigoAdapter{
  get: (data: TLoadCargoByCodigoParams) => Promise<TCargo |undefined>
}
