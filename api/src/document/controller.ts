import {Request, Response} from 'express'
import {DateTime} from 'luxon'
import {Between, Not, getRepository} from 'typeorm'
import _ from 'lodash/fp'

import * as mail from '../mail'
import {hasSetting} from '../user/utils'
import {Client} from '../client/model'
import {Document} from '../document/model'
import {DocumentItem} from '../document/item/model'

type GenerateNumberParams = {
  date: DateTime
  count: number
  type: 'quotation' | 'invoice' | 'credit'
}

// ---------------------------------------------------------------- # Read all #

function toISO(date: string | null) {
  if (_.isNull(date)) return null
  return DateTime.fromJSDate(new Date(date)).toISO()
}

export async function readAll(req: Request, res: Response) {
  const rawDocuments = await getRepository(Document)
    .createQueryBuilder('document')
    .leftJoinAndSelect('document.items', 'items')
    .where('document.user = :user', {user: req.user.id})
    .getMany()

  const documents = rawDocuments.map(document => ({
    ...document,
    createdAt: toISO(document.createdAt),
    startsAt: toISO(document.startsAt),
    endsAt: toISO(document.endsAt),
    expiresAt: toISO(document.expiresAt),
  }))

  res.json(documents)
}

// ------------------------------------------------------------------ # Create #

export async function create(req: Request, res: Response) {
  const $document = await getRepository(Document)
  const $item = await getRepository(DocumentItem)

  delete req.body.id
  req.body.number = '-'
  req.body.user = req.user.id
  req.body.client = req.body.clientId

  const document = await $document.save(req.body)
  document.items = await $item.save(
    document.items.map((item: DocumentItem) => {
      delete item.id
      item.document = document.id
      return item
    }),
  )

  res.json(document)
}

// ------------------------------------------------------------------ # Update #

export async function update(req: Request, res: Response) {
  const $document = await getRepository(Document)
  const prevDocument = await $document.findOne({id: req.body.id})

  if (!prevDocument) {
    return res.status(404).send('document introuvable')
  }

  if (['signed', 'paid'].includes(prevDocument.status)) {
    return res.status(403).send('document verrouillé')
  }

  const now = DateTime.local()
  const $item = await getRepository(DocumentItem)
  const prevItems = await $item.find({document: req.body.id})
  const [firstDayOfMonth, lastDayOfMonth] = getFirstAndLastDay(now)

  if (prevDocument.status === 'draft' && req.body.status === 'pending') {
    const documents = await $document.find({
      where: {
        id: Not(prevDocument.id),
        type: prevDocument.type,
        status: Not('draft'),
        user: req.user.id,
        createdAt: Between(firstDayOfMonth, lastDayOfMonth),
      },
      order: {createdAt: 'DESC'},
    })

    req.body.number = buildNumber({
      date: now,
      type: req.body.type,
      count: documents.length,
    })

    req.body.createdAt = now.toISO()
  }

  req.body.user = req.user.id
  req.body.client = req.body.clientId
  req.body.pdf = req.body.pdf ? Buffer.from(req.body.pdf) : null

  const document = await $document.save(req.body)
  const itemsToDelete = _.difference(
    _.map('id', prevItems),
    _.map('id', req.body.items),
  )

  if (!_.isEmpty(itemsToDelete)) {
    await $item.delete(itemsToDelete)
  }

  document.items = await $item.save(
    document.items.map((item: DocumentItem) => {
      if (item.id === -1) delete item.id
      item.document = document.id
      return item
    }),
  )

  const isPending = document.status === 'pending'
  const userHasAutoSend = hasSetting(req.user, 'documentAutoSend')

  if (isPending && userHasAutoSend) {
    const pdf = _.replace('data:application/pdf;base64,', '', document.pdf)
    const $client = await getRepository(Client)
    const client = await $client.findOneOrFail({
      select: ['email', 'firstName', 'lastName'],
      where: {id: req.body.client},
    })

    mail.send({
      subject: '[factAE] Document',
      to: client.email,
      bcc: req.user.email,
      template: {
        name: document.type,
        data: {
          from: `${req.user.firstName} ${req.user.lastName}`,
          to: `${client.firstName} ${client.lastName}`,
        },
      },
      attachment: {
        data: Buffer.from(pdf, 'base64'),
        filename: `${document.type}-${document.number}.pdf`,
      },
    })
  }

  res.json(document)
}

// ------------------------------------------------------------------ # Delete #

export {_delete as delete}
async function _delete(req: Request, res: Response) {
  const $document = await getRepository(Document)
  const document = await $document.findOne({id: req.params.id})

  if (!document) {
    return res.status(404).send('document introuvable')
  }

  if (document.userId !== req.user.id) {
    return res.status(403).send('non autorisé')
  }

  if (document.status !== 'draft') {
    return res.status(403).send('document verrouillé')
  }

  await $document.delete(document)

  res.sendStatus(204)
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

function buildNumber(params: GenerateNumberParams) {
  const date = params.date.toFormat('yyLL')
  const count = params.count + 1
  const prefix = (() => {
    switch (params.type) {
      case 'quotation':
        return 'D'
      case 'invoice':
        return 'F'
      case 'credit':
        return 'A'
    }
  })()

  return `${prefix}${date}-${count}`
}
