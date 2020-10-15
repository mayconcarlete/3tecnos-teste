export interface IValidator{
  validate: (body: any) => Error | undefined
}
