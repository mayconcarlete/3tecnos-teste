import { ICreateCargo } from '@src/domain/cargo/usecases/create-cargo'
import { AlreadyExistsError } from '../../errors/already-exists-error'
import { badRequest, created, serverError } from '../../http/responses'
import { THttpRequest, THttpResponse } from '@src/presentation/models/http-models'
import { IController } from '@src/presentation/protocols/controller'
import { IValidator } from '@src/presentation/protocols/validator'

export class CreateCargoController implements IController {
  private readonly validators: IValidator
  private readonly createCargo: ICreateCargo

  constructor (validators: IValidator, createCargo: ICreateCargo) {
    this.validators = validators
    this.createCargo = createCargo
  }

  async handle (req: THttpRequest): Promise<THttpResponse> {
    try {
      const error = this.validators.validate(req.body)
      if (error) {
        return badRequest(error)
      }
      const newCargo = await this.createCargo.create(req.body)
      if (newCargo) {
        return created(newCargo)
      }
      return badRequest(new AlreadyExistsError('cargo'))
    } catch (e) {
      return serverError(e)
    }
  }
}
