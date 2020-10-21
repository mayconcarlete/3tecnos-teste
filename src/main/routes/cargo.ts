import { Router } from 'express'
import { makeControllerAdapter } from '../adapter/controller-adapter'
import { makeCreateCargo } from '../factory/cargo/create-cargo/make-create-cargo'
import { makeGetAllCargos } from '../factory/cargo/get-all-cargos/make-get-all-cargos'

export default (app: Router): void => {
  app.post('/api/v1/cargo', makeControllerAdapter(makeCreateCargo()))
  app.get('/api/v1/cargo', makeControllerAdapter(makeGetAllCargos()))
}
