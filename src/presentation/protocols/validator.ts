export interface IValidator{
  validate: (input: any) => Error | undefined
}
