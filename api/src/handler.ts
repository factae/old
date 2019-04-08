import {Request, Response} from 'express'

type Handler = (req: Request, res: Response) => void

export function handle(handler: Handler) {
  return async (req: Request, res: Response) => {
    try {
      await handler(req, res)
    } catch (error) {
      console.error(error.message)
      res.status(500).send(error.message)
    }
  }
}
