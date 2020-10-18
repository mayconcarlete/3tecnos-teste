import { GetAllPrefeituras } from '@src/data/usecases/prefeitura/get-all-prefeituras'
import { PrefeituraDbAdapter } from '@src/infra/mongodb/prefeitura/prefeitura-adapter'
import { GetAllPrefeiturasController } from '@src/presentation/controllers/prefeitura/get-all-prefeituras-controller'

export const makeGetAllPrefeituras = (): GetAllPrefeiturasController => {
  const getAllPrefeiturasAdapter = new PrefeituraDbAdapter()
  const getAllPrefeituras = new GetAllPrefeituras(getAllPrefeiturasAdapter)
  return new GetAllPrefeiturasController(getAllPrefeituras)
}
