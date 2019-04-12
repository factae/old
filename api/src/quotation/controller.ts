import {Request, Response} from 'express'
import _ from 'lodash/fp'
import {DateTime} from 'luxon'
import {getRepository} from 'typeorm'

import * as mail from '../mail'
import {hasSetting} from '../user/utils'
import {Client} from '../client/model'
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
      const createdAt = _.isNull(quotation.createdAt)
        ? null
        : DateTime.fromJSDate(new Date(quotation.createdAt)).toISO()

      const startsAt = _.isNull(quotation.startsAt)
        ? null
        : DateTime.fromJSDate(new Date(quotation.startsAt)).toISO()

      const endsAt = _.isNull(quotation.endsAt)
        ? null
        : DateTime.fromJSDate(new Date(quotation.endsAt)).toISO()

      const expiresAt = _.isNull(quotation.expiresAt)
        ? null
        : DateTime.fromJSDate(new Date(quotation.expiresAt)).toISO()

      return {
        ...quotation,
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
  req.body.createdAt = DateTime.local().toISO()

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
  const currQuotation = await $quotation.findOne({id: req.body.id})

  if (!currQuotation) {
    return res.status(404).send('devis introuvable')
  }

  if (currQuotation.status === 'signed') {
    return res.status(403).send('devis verrouillé')
  }

  req.body.user = req.user.id
  req.body.client = req.body.clientId
  req.body.pdf = req.body.pdf ? Buffer.from(req.body.pdf) : null

  const quotation = await $quotation.save(req.body)
  quotation.items = await $item.save(
    quotation.items.map((item: ContractItem) => {
      if (item.id === -1) delete item.id
      item.contract = quotation.id
      return item
    }),
  )

  const isPending = quotation.status === 'pending'
  const userHasAutoSend = hasSetting(req.user, 'quotationAutoSend')

  if (isPending && userHasAutoSend) {
    const pdf = _.replace('data:application/pdf;base64,', '', quotation.pdf)
    const $client = await getRepository(Client)
    const client = await $client.findOneOrFail({
      select: ['email', 'firstName', 'lastName'],
      where: {id: req.body.client},
    })

    await mail.send({
      subject: '[factAE] Devis',
      to: client.email,
      bcc: req.user.email,
      template: {
        name: 'quotation',
        data: {
          from: `${req.user.firstName} ${req.user.lastName}`,
          to: `${client.firstName} ${client.lastName}`,
        },
      },
      attachment: {
        data: Buffer.from(pdf, 'base64'),
        filename: `devis-${quotation.id}.pdf`,
      },
    })
  }

  res.json(quotation)
}
