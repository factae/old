import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import assign from 'lodash/fp/assign'

import {Quotation} from './model'
import {ContractItem} from '../contractItem/model'

// ---------------------------------------------------------------- # Read all #

export async function readAll(req: Request, res: Response) {
  const quotations = await getRepository(Quotation)
    .createQueryBuilder('quotation')
    .leftJoinAndSelect('quotation.items', 'items')
    .where('quotation.user = :user', {user: req.user.id})
    .getMany()

  res.json(quotations)
}

// ------------------------------------------------------------------ # Create #

export async function create(req: Request, res: Response) {
  return save(req, res)
}

// ------------------------------------------------------------------ # Update #

export async function update(req: Request, res: Response) {
  return save(req, res)
}

// -------------------------------------------------------------------- # Save #

export async function save(req: Request, res: Response) {
  const quotationRepository = await getRepository(Quotation)
  const itemRepository = await getRepository(ContractItem)

  req.body.user = req.user
  req.body.client = req.body.clientId

  let quotation: Quotation = req.body
  quotation = await quotationRepository.save(quotation)

  let items: ContractItem[] = quotation.items.map(assign({quotation}))
  await itemRepository.save(items)

  res.json(quotation)
}
