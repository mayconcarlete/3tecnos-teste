import { ICreatePrefeitura } from '@src/domain/prefeitura/usecases/create-prefeitura'
import { badRequest, ok, serverError } from '../../http/responses'
import { THttpRequest, THttpResponse } from '@src/presentation/models/http-models'
import { IController } from '@src/presentation/protocols/controller'
import { IValidator } from '@src/presentation/protocols/validator'

export class CreatePrefeituraController implements IController {
  private readonly validators: IValidator
  private readonly createPrefeitura: ICreatePrefeitura

  constructor (validators: IValidator, createPrefeitura: ICreatePrefeitura) {
    this.validators = validators
    this.createPrefeitura = createPrefeitura
  }

  async handle (req: THttpRequest): Promise<THttpResponse> {
    try {
      const error = this.validators.validate(req.body)
      if (error) {
        return badRequest(error)
      }
      const newPrefeitura = await this.createPrefeitura.create(req.body)
      if (!newPrefeitura) {
        return badRequest(new Error('Prefeitura already exists in DB'))
      }
      return ok(newPrefeitura)
    } catch (e) {
      return serverError(e)
    }
  }
}
