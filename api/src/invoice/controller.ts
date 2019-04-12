import {Request, Response} from 'express'
import _ from 'lodash/fp'
import {DateTime} from 'luxon'
import {getRepository, Between, Not} from 'typeorm'

import * as mail from '../mail'
import {hasSetting} from '../user/utils'
import {Client} from '../client/model'
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
      const createdAt = _.isNull(invoice.createdAt)
        ? null
        : DateTime.fromJSDate(new Date(invoice.createdAt)).toISO()

      return {...invoice, createdAt}
    }),
  )
}

// ------------------------------------------------------------------ # Create #

export async function create(req: Request, res: Response) {
  const $invoice = await getRepository(Contract)
  const $item = await getRepository(ContractItem)

  delete req.body.id
  req.body.user = req.user.id
  req.body.client = req.body.clientId
  req.body.createdAt = DateTime.local().toISO()

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
  const prevInvoice = await $invoice.findOne({id: req.body.id})

  if (!prevInvoice) {
    return res.status(404).send('facture introuvable')
  }

  if (prevInvoice.status === 'paid') {
    return res.status(403).send('facture verrouillée')
  }

  const now = DateTime.local()
  const $item = await getRepository(ContractItem)
  const [firstDayOfMonth, lastDayOfMonth] = getFirstAndLastDay(now)

  if (prevInvoice.status === 'draft' && req.body.status === 'pending') {
    const invoices = await $invoice.find({
      where: {
        id: Not(prevInvoice.id),
        type: 'invoice',
        client: req.body.clientId,
        createdAt: Between(firstDayOfMonth, lastDayOfMonth),
      },
      order: {createdAt: 'DESC'},
    })

    req.body.number = `${now.toFormat('yyLL')}-${invoices.length + 1}`
  }

  req.body.user = req.user.id
  req.body.client = req.body.clientId
  req.body.pdf = req.body.pdf ? Buffer.from(req.body.pdf) : null

  const invoice = await $invoice.save(req.body)
  invoice.items = await $item.save(
    invoice.items.map((item: ContractItem) => {
      if (item.id === -1) delete item.id
      item.contract = invoice.id
      return item
    }),
  )

  const wasPending = prevInvoice.status === 'pending'
  const isPending = invoice.status === 'pending'
  const userHasAutoSend = hasSetting(req.user, 'invoiceAutoSend')

  if (wasPending && isPending && userHasAutoSend) {
    const pdf = _.replace('data:application/pdf;base64,', '', invoice.pdf)
    const $client = await getRepository(Client)
    const client = await $client.findOneOrFail({
      select: ['email', 'firstName', 'lastName'],
      where: {id: req.body.client},
    })

    await mail.send({
      subject: '[factAE] Facture',
      to: client.email,
      bcc: req.user.email,
      template: {
        name: 'invoice',
        data: {
          from: `${req.user.firstName} ${req.user.lastName}`,
          to: `${client.firstName} ${client.lastName}`,
        },
      },
      attachment: {
        data: Buffer.from(pdf, 'base64'),
        filename: `facture-${invoice.number}.pdf`,
      },
    })
  }
  res.json(invoice)
}

// ------------------------------------------------------------------- # Utils #

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
