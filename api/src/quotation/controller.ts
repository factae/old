import {Request, Response} from 'express'
import get from 'lodash/get'
import isNull from 'lodash/isNull'
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
      const createdAt = isNull(quotation.createdAt)
        ? null
        : DateTime.fromJSDate(new Date(quotation.createdAt)).toISO()

      const startsAt = isNull(quotation.startsAt)
        ? null
        : DateTime.fromJSDate(new Date(quotation.startsAt)).toISO()

      const endsAt = isNull(quotation.endsAt)
        ? null
        : DateTime.fromJSDate(new Date(quotation.endsAt)).toISO()

      const expiresAt = isNull(quotation.expiresAt)
        ? null
        : DateTime.fromJSDate(new Date(quotation.expiresAt)).toISO()

      return {
        ...quotation,
        conditions: get(quotation, 'quotationConditions', null),
        createdAt,
        startsAt,
        endsAt,
        expiresAt,
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

  if (req.body.status === 'validated') {
    req.body.createdAt = DateTime.local().toISO()
  }

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
