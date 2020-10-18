import { IGetAllPrefeituras } from '@src/domain/prefeitura/usecases/get-all-prefeituras'
import { ok, serverError } from '../../http/responses'
import { THttpRequest, THttpResponse } from '@src/presentation/models/http-models'
import { IController } from '@src/presentation/protocols/controller'

export class GetAllPrefeiturasController implements IController {
  private readonly getAllPrefeituras: IGetAllPrefeituras
  constructor (getAllPrefeituras: IGetAllPrefeituras) {
    this.getAllPrefeituras = getAllPrefeituras
  }

  async handle (req: THttpRequest): Promise<THttpResponse> {
    try {
      const prefeituras = await this.getAllPrefeituras.getAll()
      return ok(prefeituras)
    } catch (e) {
      return serverError(e)
    }
  }
}
