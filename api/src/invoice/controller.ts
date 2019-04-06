import {Request, Response} from 'express'
import get from 'lodash/get'
import isNull from 'lodash/isNull'
import {DateTime} from 'luxon'
import {getRepository, Not, Equal, Between} from 'typeorm'

import {Contract} from '../contract/model'
import {ContractItem} from '../contractItem/model'

// ---------------------------------------------------------------- # Read all #

export async function readAll(req: Request, res: Response) {
  const invoices = await getRepository(Contract)
    .createQueryBuilder('invoice')
    .leftJoinAndSelect('invoice.items', 'items')
    .where('invoice.type = :type', {type: 'invoice'})
    .andWhere('invoice.user = :user', {user: req.user.id})
    .getMany()

  res.json(
    invoices.map(invoice => {
      const createdAt = isNull(invoice.createdAt)
        ? null
        : DateTime.fromJSDate(new Date(invoice.createdAt)).toISO()

      return {
        ...invoice,
        conditions: get(invoice, 'invoiceConditions', null),
        createdAt,
      }
    }),
  )
}

// ------------------------------------------------------------------ # Create #

export async function create(req: Request, res: Response) {
  const $invoice = await getRepository(Contract)
  const $item = await getRepository(ContractItem)

  delete req.body.id
  req.body.number = '-'
  req.body.user = req.user.id
  req.body.client = req.body.clientId
  req.body.invoiceConditions = req.body.conditions

  const invoice = await $invoice.save(req.body)
  invoice.items = await $item.save(
    invoice.items.map((item: ContractItem) => {
      delete item.id
      item.contract = invoice.id
      return item
    }),
  )

  res.json(invoice)
}

// ------------------------------------------------------------------ # Update #

export async function update(req: Request, res: Response) {
  const $invoice = await getRepository(Contract)
  const $item = await getRepository(ContractItem)
  const now = DateTime.local()
  const [firstDayOfMonth, lastDayOfMonth] = getFirstAndLastDay(now)

  const invoices = await $invoice.find({
    where: {
      type: 'invoice',
      status: Not(Equal('draft')),
      clientId: req.body.clientId,
      createdAt: Between(firstDayOfMonth, lastDayOfMonth),
    },
    order: {createdAt: 'DESC'},
  })

  req.body.invoiceConditions = req.body.conditions

  if (req.body.status === 'validated') {
    req.body.number = `${now.toFormat('yyLL')}-${invoices.length + 1}`
    req.body.createdAt = DateTime.local().toISO()
  }

  const invoice = await $invoice.save(req.body)
  invoice.items = await $item.save(
    invoice.items.map((item: ContractItem) => {
      if (item.id === -1) delete item.id
      item.contract = invoice.id
      return item
    }),
  )

  res.json(invoice)
}

function getFirstAndLastDay(date: DateTime) {
  const firstDayOfMonth = date.set({
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  })

  const lastDayOfMonth = date.set({
    day: firstDayOfMonth.plus({months: 1}).minus({days: 1}).day,
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 999,
  })

  return [firstDayOfMonth.toSQL(), lastDayOfMonth.toSQL()]
}
