import {Request, Response} from 'express'
import get from 'lodash/get'
import {DateTime} from 'luxon'
import {getRepository} from 'typeorm'

import {Contract} from '../contract/model'
import {ContractItem} from '../contractItem/model'

// ---------------------------------------------------------------- # Read all #

export async function readAll(req: Request, res: Response) {
  const quotations = await getRepository(Contract)
    .createQueryBuilder('quotation')
    .leftJoinAndSelect('quotation.items', 'items')
    .where('quotation.type = :type', {type: 'quotation'})
    .andWhere('quotation.user = :user', {user: req.user.id})
    .getMany()

  res.json(
    quotations.map(quotation => {
      const createdAt = DateTime.fromJSDate(new Date(quotation.createdAt))
      const startsAt = DateTime.fromJSDate(new Date(quotation.startsAt))
      const endsAt = DateTime.fromJSDate(new Date(quotation.endsAt))
      const expiresAt = quotation.expiresAt
        ? DateTime.fromJSDate(new Date(quotation.expiresAt))
        : createdAt.plus({months: 1})

      return {
        ...quotation,
        conditions: get(quotation, 'quotationConditions', null),
        createdAt: createdAt.toISO(),
        startsAt: startsAt.toISO(),
        endsAt: endsAt.toISO(),
        expiresAt: expiresAt.toISO(),
      }
    }),
  )
}

// ------------------------------------------------------------------ # Create #

export async function create(req: Request, res: Response) {
  const $quotation = await getRepository(Contract)
  const $item = await getRepository(ContractItem)

  delete req.body.id
  req.body.user = req.user.id
  req.body.client = req.body.clientId
  req.body.quotationConditions = req.body.conditions

  const quotation = await $quotation.save(req.body)
  quotation.items = await $item.save(
    quotation.items.map((item: ContractItem) => {
      delete item.id
      item.contract = quotation.id
      return item
    }),
  )

  res.json(quotation)
}

// ------------------------------------------------------------------ # Update #

export async function update(req: Request, res: Response) {
  const $quotation = await getRepository(Contract)
  const $item = await getRepository(ContractItem)

  req.body.user = req.user.id
  req.body.client = req.body.clientId
  req.body.pdf = req.body.pdf ? Buffer.from(req.body.pdf) : null
  req.body.quotationConditions = req.body.conditions

  const quotation = await $quotation.save(req.body)
  quotation.items = await $item.save(
    quotation.items.map((item: ContractItem) => {
      if (item.id === -1) delete item.id
      item.contract = quotation.id
      return item
    }),
  )

  res.json(quotation)
}
