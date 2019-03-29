import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import assign from 'lodash/assign'
import omit from 'lodash/omit'
import {DateTime} from 'luxon'

import {Contract} from '../contract/model'
import {ContractItem} from '../contractItem/model'

// ---------------------------------------------------------------- # Read all #

export async function readAll(req: Request, res: Response) {
  let quotations = await getRepository(Contract)
    .createQueryBuilder('quotation')
    .leftJoinAndSelect('quotation.items', 'items')
    .where('quotation.type = :type', {type: 'quotation'})
    .andWhere('quotation.user = :user', {user: req.user.id})
    .getMany()

  quotations.forEach(quotation => {
    const createdAt = DateTime.fromJSDate(new Date(quotation.createdAt))
    const startsAt = DateTime.fromJSDate(new Date(quotation.startsAt))
    const endsAt = DateTime.fromJSDate(new Date(quotation.endsAt))
    const expiresAt = quotation.expiresAt
      ? DateTime.fromJSDate(new Date(quotation.expiresAt))
      : createdAt.plus({months: 1})

    assign(quotation, {
      createdAt: createdAt.toISO(),
      startsAt: startsAt.toISO(),
      endsAt: endsAt.toISO(),
      expiresAt: expiresAt.toISO(),
    })
  })

  res.json(quotations)
}

// ------------------------------------------------------------------ # Create #

export async function create(req: Request, res: Response) {
  const now = DateTime.local()

  const quotationRepository = await getRepository(Contract)
  const itemRepository = await getRepository(ContractItem)

  req.body.user = req.user
  req.body.client = req.body.clientId

  const quotations = await quotationRepository.find({
    where: {type: 'quotation', clientId: req.body.clientId},
    order: {createdAt: 'DESC'},
  })

  const quotation: Contract = await quotationRepository.save({
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
  const quotationRepository = await getRepository(Contract)
  const itemRepository = await getRepository(ContractItem)

  const quotation: Contract = await quotationRepository.save(req.body)

  await itemRepository.save(
    quotation.items.map(item => {
      const id = item.id === -1 ? {} : {id: item.id}
      return assign(omit(item, 'id'), id, {quotation})
    }),
  )

  res.json(quotation)
}
