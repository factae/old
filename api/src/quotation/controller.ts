import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import assign from 'lodash/assign'
import omit from 'lodash/omit'

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
  const quotationRepository = await getRepository(Quotation)
  const itemRepository = await getRepository(ContractItem)

  req.body.user = req.user
  req.body.client = req.body.clientId

  let quotation: Quotation = omit(req.body, 'id')
  quotation = await quotationRepository.save(quotation)

  await itemRepository.save(
    quotation.items.map(item => assign(omit(item, 'id'), {quotation})),
  )

  res.json(quotation)
}

// ------------------------------------------------------------------ # Update #

export async function update(req: Request, res: Response) {
  const quotationRepository = await getRepository(Quotation)
  const itemRepository = await getRepository(ContractItem)

  let quotation: Quotation = req.body
  quotation = await quotationRepository.save(quotation)

  await itemRepository.save(
    quotation.items.map(item => {
      const id = item.id === -1 ? {} : {id: item.id}
      return assign(omit(item, 'id'), id, {quotation})
    }),
  )

  res.json(quotation)
}
