import express from 'express'
import prefeituraRoute from '../routes/prefeitura'
import cargoRoute from '../routes/cargo'

const app = express()
app.use(express.json())

prefeituraRoute(app)
cargoRoute(app)

/*
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
*/
export default app
