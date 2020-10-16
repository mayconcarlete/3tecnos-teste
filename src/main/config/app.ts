import express from 'express'
import Prefeitura from '@src/infra/mongodb/models/prefeitura'
import Cargo from '@src/infra/mongodb/models/cargo'

const app = express()
app.use(express.json())
app.post('/cargo', async (req, res) => {
  const result = await Cargo.create({
    prefeituraId: '5f884840e64513457013731d',
    cargoType: 'COMISSIONADO',
    cargoNome: 'Inspetor Nivel I 125h'
  })
  return res.json(result)
})
app.post('/prefeitura', async (req, res) => {
  const prefeitura = await Prefeitura.create({
    name: 'Maykids',
    createdAt: Date.now(),
    updatedAt: Date.now()
  })
  return res.json(prefeitura)
})
app.post('/servidor', async (req, res) => {

})
export default app
