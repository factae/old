import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import assign from 'lodash/assign'
import omit from 'lodash/omit'
import {DateTime} from 'luxon'

import {Quotation} from './model'
import {ContractItem} from '../contractItem/model'

// ---------------------------------------------------------------- # Read all #

export async function readAll(req: Request, res: Response) {
  const quotations = await getRepository(Quotation)
    .createQueryBuilder('quotation')
    .leftJoinAndSelect('quotation.items', 'items')
    .where('quotation.user = :user', {user: req.user.id})
    .getMany()

  res.json(
    quotations.map(q =>
      assign(q, {
        createdAt: DateTime.fromJSDate(new Date(q.createdAt)).toISO(),
        expiresAt: DateTime.fromJSDate(new Date(q.expiresAt)).toISO(),
        startsAt: DateTime.fromJSDate(new Date(q.startsAt)).toISO(),
        endsAt: DateTime.fromJSDate(new Date(q.endsAt)).toISO(),
      }),
    ),
  )
}

// ------------------------------------------------------------------ # Create #

export async function create(req: Request, res: Response) {
  const now = DateTime.local()

  const quotationRepository = await getRepository(Quotation)
  const itemRepository = await getRepository(ContractItem)

  req.body.user = req.user
  req.body.client = req.body.clientId

  const quotations = await quotationRepository.find({
    where: {clientId: req.body.clientId},
    order: {createdAt: 'DESC'},
  })

  const quotation: Quotation = await quotationRepository.save({
    ...omit(req.body, 'id'),
    number: `${now.toFormat('yyLL')}-${quotations.length + 1}`,
  })

  await itemRepository.save(
    quotation.items.map(item => assign(omit(item, 'id'), {quotation})),
  )

  res.json(quotation)
}

// ------------------------------------------------------------------ # Update #

export async function update(req: Request, res: Response) {
  const quotationRepository = await getRepository(Quotation)
  const itemRepository = await getRepository(ContractItem)

  const quotation: Quotation = await quotationRepository.save(req.body)

  await itemRepository.save(
    quotation.items.map(item => {
      const id = item.id === -1 ? {} : {id: item.id}
      return assign(omit(item, 'id'), id, {quotation})
    }),
  )

  res.json(quotation)
}
