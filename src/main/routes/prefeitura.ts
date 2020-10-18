import { Router } from 'express'
import { makeControllerAdapter } from '../adapter/controller-adapter'
import { makeCreatePrefeiruta } from '../factory/prefeitura/create-prefeitura/create-prefeitura-factory'
import { makeGetAllPrefeituras } from '../factory/prefeitura/get-all-prefeituras/make-get-all-prefeituras'

export default (router: Router): void => {
  router.post('/api/v1/prefeitura', makeControllerAdapter(makeCreatePrefeiruta()))
  router.get('/api/v1/prefeitura', makeControllerAdapter(makeGetAllPrefeituras()))
}
