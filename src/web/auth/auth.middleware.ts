import { Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/ban-types
export default (req: Request, res: Response, next: Function) => {
  res.locals.user = req.user
  next()
}
