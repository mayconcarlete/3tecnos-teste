import { CreateCargo } from '@src/data/usecases/cargos/create-cargo'
import { CargoDbAdapter } from '@src/infra/mongodb/cargo/cargo-adapter'
import { CreateCargoController } from '@src/presentation/controllers/cargo/create-cargo-controller'
import { makeCreateCargoValidators } from './make-create-cargo-factory'

export const makeCreateCargo = (): CreateCargoController => {
  const validators = makeCreateCargoValidators()
  const dbAdapter = new CargoDbAdapter()
  const createCargo = new CreateCargo(dbAdapter, dbAdapter)
  return new CreateCargoController(validators, createCargo)
}
