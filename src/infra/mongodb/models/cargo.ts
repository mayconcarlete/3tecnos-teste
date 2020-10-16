import { Schema, model } from 'mongoose'

const cargo = new Schema({
  prefeituraId: { type: String },
  cargoType: { type: String },
  codigo: { type: Number },
  cargoNome: { type: String },
  salario: { type: Number },
  vagasTotais: { type: Number },
  vagasPreenchidas: { type: Number }
}, {
  timestamps: true
})

export default model('Cargo', cargo)
