import { Router } from 'express'
import { makeControllerAdapter } from '../adapter/controller-adapter'
import { makeCreatePrefeiruta } from '../factory/prefeitura/create-prefeitura/create-prefeitura-factory'

export default (router: Router): void => {
  router.post('/api/v1/prefeitura', makeControllerAdapter(makeCreatePrefeiruta()))
}
