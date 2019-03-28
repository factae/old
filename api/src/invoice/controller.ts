import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import assign from 'lodash/assign'
import omit from 'lodash/omit'
import {DateTime} from 'luxon'

import {Invoice} from './model'
import {ContractItem} from '../contractItem/model'

// ---------------------------------------------------------------- # Read all #

export async function readAll(req: Request, res: Response) {
  const invoices = await getRepository(Invoice)
    .createQueryBuilder('invoice')
    .leftJoinAndSelect('invoice.items', 'items')
    .where('invoice.user = :user', {user: req.user.id})
    .getMany()

  res.json(
    invoices.map(q =>
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

  const invoiceRepository = await getRepository(Invoice)
  const itemRepository = await getRepository(ContractItem)

  req.body.user = req.user
  req.body.client = req.body.clientId

  const invoices = await invoiceRepository.find({
    where: {clientId: req.body.clientId},
    order: {createdAt: 'DESC'},
  })

  const invoice: Invoice = await invoiceRepository.save({
    ...omit(req.body, 'id'),
    number: `${now.toFormat('yyLL')}-${invoices.length + 1}`,
  })

  await itemRepository.save(
    invoice.items.map(item => assign(omit(item, 'id'), {invoice})),
  )

  res.json(invoice)
}

// ------------------------------------------------------------------ # Update #

export async function update(req: Request, res: Response) {
  const invoiceRepository = await getRepository(Invoice)
  const itemRepository = await getRepository(ContractItem)

  const invoice: Invoice = await invoiceRepository.save(req.body)

  await itemRepository.save(
    invoice.items.map(item => {
      const id = item.id === -1 ? {} : {id: item.id}
      return assign(omit(item, 'id'), id, {invoice})
    }),
  )

  res.json(invoice)
}
