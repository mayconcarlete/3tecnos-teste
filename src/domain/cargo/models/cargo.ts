import { TPrefeitura } from '@src/domain/prefeitura/model/prefeitura'
export interface TCargo {
  id: string
  prefeituraId: TPrefeitura
  prefeitura: TPrefeitura
  cargoType: string
  codigo: number
  cargoNome: string
  salario: number
  vagasTotais: number
  vagasPreenchidas: number
  createdAt: Date
  updatedAt: Date
}

export interface TCargoParams {
  prefeituraId: string
  cargoType: string
  codigo: number
  cargoNome: string
  salario: number
  vagasTotais: number
  vagasPreenchidas: number
}
