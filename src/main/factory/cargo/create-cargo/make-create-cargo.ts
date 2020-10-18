import { CreateCargo } from '@src/data/usecases/cargos/create-cargo'
import { CreateCargoController } from '@src/presentation/controllers/cargo/create-cargo-controller'
import { makeCreateCargoValidators } from './make-create-cargo-factory'

export const makeCreateCargo = (): CreateCargoController => {
  const validators = makeCreateCargoValidators()

  const createCargo = new CreateCargo()
  return new CreateCargoController(validators, createCargo)
}
