import { ICreateCargoAdapter } from '@src/data/protocols/cargo/create-cargo'
import { ILoadCargoByCodigoAdapter } from '@src/data/protocols/cargo/load-cargo-by-codigo'
import { TCargo, TCargoParams } from '@src/domain/cargo/models/cargo'
import { ICreateCargo } from '@src/domain/cargo/usecases/create-cargo'

export class CreateCargo implements ICreateCargo {
  private readonly loadCargoByCodigo: ILoadCargoByCodigoAdapter
  private readonly createCargoAdapter: ICreateCargoAdapter
  constructor (loadCargoByCodigo: ILoadCargoByCodigoAdapter, createCargoAdapter: ICreateCargoAdapter) {
    this.loadCargoByCodigo = loadCargoByCodigo
    this.createCargoAdapter = createCargoAdapter
  }

  async create (data: TCargoParams): Promise<TCargo | undefined> {
    const { codigo, prefeituraId } = data
    const loadCargoById = await this.loadCargoByCodigo.get({ codigo, prefeituraId })
    if (!loadCargoById) {
      const newCargo = await this.createCargoAdapter.add(data)
      return newCargo
    }
    return undefined
  }
}
