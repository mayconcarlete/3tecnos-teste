import { ILoadAllCargosAdapter } from '@src/data/protocols/cargo/load-all-cargos'
import { TCargo } from '@src/domain/cargo/models/cargo'
import { IgetAllCargos } from '@src/domain/cargo/usecases/get-all-cargos'

export class GetAllCargos implements IgetAllCargos {
  private readonly loadCargosAdapter: ILoadAllCargosAdapter
  constructor (loadCargosAdapter: ILoadAllCargosAdapter) {
    this.loadCargosAdapter = loadCargosAdapter
  }

  async get (): Promise<TCargo[] |[]> {
    const cargos = await this.loadCargosAdapter.loadAll()
    return cargos
  }
}
