import { ICreateCargoAdapter } from '@src/data/protocols/cargo/create-cargo'
import { ILoadCargoByCodigoAdapter, TLoadCargoByCodigoParams } from '@src/data/protocols/cargo/load-cargo-by-codigo'
import { TCargo, TCargoParams } from '@src/domain/cargo/models/cargo'
import Cargo, { CargoModel } from '../models/cargo'

export class CargoDbAdapter implements ILoadCargoByCodigoAdapter, ICreateCargoAdapter {
  async add (data: TCargoParams): Promise<TCargo> {
    const newCargo = await Cargo.create<any>(data)
    return this.remapId(newCargo)
  }

  async get (data: TLoadCargoByCodigoParams): Promise<TCargo | undefined> {
    const getCargoByCodigo = await Cargo.findOne({ codigo: data.codigo })
    if (getCargoByCodigo) {
      return this.remapId(getCargoByCodigo)
    }
    return undefined
  }

  remapId (data: CargoModel): TCargo {
    return {
      id: data._id,
      prefeituraId: data.prefeituraId,
      prefeitura: data.prefeitura,
      cargoType: data.cargoType,
      codigo: data.codigo,
      cargoNome: data.cargoNome,
      salario: data.salario,
      vagasTotais: data.vagasTotais,
      vagasPreenchidas: data.vagasPreenchidas,
      updatedAt: data.updatedAt,
      createdAt: data.createdAt
    }
  }
}
