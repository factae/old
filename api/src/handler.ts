import {Request, Response} from 'express'

type Handler = (req: Request, res: Response) => void

export function handle(handler: Handler) {
  return async (req: Request, res: Response) => {
    try {
      await handler(req, res)
    } catch (error) {
      switch (error.code) {
        case 'ER_DUP_ENTRY':
          res.status(400)
          res.send('Email already exists')
          break

        default:
          console.error(error)
          res.status(500)
          res.send(error.message)
      }
    }
  }
}
