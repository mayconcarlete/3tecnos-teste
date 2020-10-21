import { TCargo } from '@src/domain/cargo/models/cargo'
import mongoose, { Schema, model, Document } from 'mongoose'

type CargoOmitId = Omit<TCargo,'id'>
export interface CargoModel extends CargoOmitId, Document{}

const cargo = new Schema({
  prefeituraId: { type: String },
  prefeitura: { type: mongoose.Schema.Types.ObjectId, ref: 'Prefeitura' } ,
  cargoType: { type: String },
  codigo: { type: Number },
  cargoNome: { type: String },
  salario: { type: Number },
  vagasTotais: { type: Number },
  vagasPreenchidas: { type: Number }
}, {
  timestamps: true
})

export default model<CargoModel>('Cargo', cargo)
