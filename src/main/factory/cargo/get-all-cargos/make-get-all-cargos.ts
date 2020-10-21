import { GetAllCargos } from '@src/data/usecases/cargos/get-all-cargos'
import { CargoDbAdapter } from '@src/infra/mongodb/cargo/cargo-adapter'
import { GetAllCargosController } from '@src/presentation/controllers/cargo/get-all-cargos-controller'

export const makeGetAllCargos = (): GetAllCargosController => {
  const getAllCargosAdapter = new CargoDbAdapter()
  const getAllCargos = new GetAllCargos(getAllCargosAdapter)
  return new GetAllCargosController(getAllCargos)
}
