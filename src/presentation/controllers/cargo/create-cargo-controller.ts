import { ok, serverError } from '@src/presentation/http/responses'
import { THttpRequest, THttpResponse } from '@src/presentation/models/http-models'
import { IController } from '@src/presentation/protocols/controller'

export class CargoController implements IController {
  async handle (req: THttpRequest): Promise<THttpResponse> {
    try {
      return ok('ok')
    } catch (e) {
      return serverError(e)
    }
  }
}
