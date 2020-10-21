import { Router } from 'express'
import { makeControllerAdapter } from '../adapter/controller-adapter'
import { makeCreateCargo } from '../factory/cargo/create-cargo/make-create-cargo'

export default (app: Router): void => {
  app.post('/api/v1/cargo', makeControllerAdapter(makeCreateCargo()))
}
