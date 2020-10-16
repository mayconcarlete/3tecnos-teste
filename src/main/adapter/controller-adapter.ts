import { Request, Response } from 'express'
import { IController } from '@src/presentation/protocols/controller'
import { THttpRequest } from '@src/presentation/models/http-models'

export const makeControllerAdapter = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: THttpRequest = {
      body: req.body,
      headers: req.headers
    }
    const result = await controller.handle(httpRequest)
    return res.status(result.statusCode).json(result.body)
  }
}
