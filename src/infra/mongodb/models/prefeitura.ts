// import { TPrefeitura } from '@src/domain/prefeitura/model/prefeitura'
import { Schema, model } from 'mongoose'

const prefeitura = new Schema({
  name: { type: String }
}, {
  timestamps: true
})

export default model('Prefeitura', prefeitura)

/*
type PrefeituraOmitId = Omit<TPrefeitura, 'id'>

interface PrefeituraModel extends PrefeituraOmitId, Document {}

const prefeitura: Schema = new Schema({}, { timestamps: true })

export default model<PrefeituraModel>('Prefeitura', prefeitura)
*/