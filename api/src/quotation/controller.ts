import {Request, Response} from 'express'
import {getRepository} from 'typeorm'

import {Quotation} from './model'

// ---------------------------------------------------------------- # Read all #

export async function readAll(req: Request, res: Response) {
  const repository = await getRepository(Quotation)
  const quotations = await repository.find({user: req.user})

  res.json(quotations)
}

// ------------------------------------------------------------------ # Create #

export async function create(req: Request, res: Response) {
  const repository = await getRepository(Quotation)

  const quotation: Quotation = {...req.body, user: req.user}
  await repository.insert(quotation)

  res.json(quotation)
}
