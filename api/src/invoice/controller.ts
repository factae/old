import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import assign from 'lodash/assign'
import omit from 'lodash/omit'
import {DateTime} from 'luxon'

import {Contract} from '../contract/model'
import {ContractItem} from '../contractItem/model'

// ---------------------------------------------------------------- # Read all #

export async function readAll(req: Request, res: Response) {
  let invoices = await getRepository(Contract)
    .createQueryBuilder('invoice')
    .leftJoinAndSelect('invoice.items', 'items')
    .where('invoice.type = :type', {type: 'invoice'})
    .andWhere('invoice.user = :user', {user: req.user.id})
    .getMany()

  invoices.forEach(invoice => {
    const createdAt = DateTime.fromJSDate(new Date(invoice.createdAt)).toISO()
    const startsAt = DateTime.fromJSDate(new Date(invoice.startsAt)).toISO()
    const endsAt = DateTime.fromJSDate(new Date(invoice.endsAt)).toISO()

    assign(invoice, {createdAt, startsAt, endsAt})
  })

  res.json(invoices)
}

// ------------------------------------------------------------------ # Create #

export async function create(req: Request, res: Response) {
  const now = DateTime.local()

  const invoiceRepository = await getRepository(Contract)
  const itemRepository = await getRepository(ContractItem)

  req.body.user = req.user
  req.body.client = req.body.clientId

  const invoices = await invoiceRepository.find({
    where: {type: 'invoice', clientId: req.body.clientId},
    order: {createdAt: 'DESC'},
  })

  const invoice: Contract = await invoiceRepository.save({
    ...omit(req.body, 'id'),
    number: `${now.toFormat('yyLL')}-${invoices.length + 1}`,
  })

  await itemRepository.save(
    invoice.items.map(item => assign(omit(item, 'id'), {contract: invoice})),
  )

  res.json(invoice)
}

// ------------------------------------------------------------------ # Update #

export async function update(req: Request, res: Response) {
  const invoiceRepository = await getRepository(Contract)
  const itemRepository = await getRepository(ContractItem)

  const invoice: Contract = await invoiceRepository.save(req.body)

  await itemRepository.save(
    invoice.items.map(item => {
      const id = item.id === -1 ? {} : {id: item.id}
      return assign(omit(item, 'id'), id, {invoice})
    }),
  )

  res.json(invoice)
}
