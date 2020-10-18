import { THttpRequest, THttpResponse } from '../models/http-models'

export interface IController{
  handle: (req: THttpRequest) => Promise<THttpResponse>
}
