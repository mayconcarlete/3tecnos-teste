enum ECargoType {
  comissionado = 'COMISSIONADO',
  efetivo = 'EFETIVO'
}
export interface TCargo {
  id: string
  prefeituraId: string
  cargoType: ECargoType
  codigo: number
  cargoNome: string
  salario: number
  vagasTotais: number
  vagasPreenchidas: number
  createdAt: Date
  updatedAt: Date
}
