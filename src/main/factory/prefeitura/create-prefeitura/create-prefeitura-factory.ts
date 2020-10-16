import { CreatePrefeitura } from '@src/data/usecases/prefeitura/create-prefeitura'
import { PrefeituraDbAdapter } from '@src/infra/mongodb/prefeitura/prefeitura-adapter'
import { CreatePrefeituraController } from '@src/presentation/controllers/prefeitura/prefeitura-controller'
import { IController } from '@src/presentation/protocols/controller'
import { makeCreatePrefeituraValidators } from './create-prefeitura-validators'

export const makeCreatePrefeiruta = (): IController => {
  const validators = makeCreatePrefeituraValidators()
  const dbAdapter = new PrefeituraDbAdapter()
  const createPrefeitura = new CreatePrefeitura(dbAdapter, dbAdapter)
  return new CreatePrefeituraController(validators, createPrefeitura)
}
