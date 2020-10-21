import { IgetAllCargos } from '@src/domain/cargo/usecases/get-all-cargos'
import { ok, serverError } from '../../http/responses'
import { THttpRequest, THttpResponse } from '@src/presentation/models/http-models'
import { IController } from '@src/presentation/protocols/controller'

export class GetAllCargosController implements IController {
  private readonly getAllCargos: IgetAllCargos

  constructor (getAllCargos: IgetAllCargos) {
    this.getAllCargos = getAllCargos
  }

  async handle (req: THttpRequest): Promise<THttpResponse> {
    try {
      const cargos = await this.getAllCargos.get()
      return ok(cargos)
    } catch (e) {
      return serverError(e)
    }
  }
}
