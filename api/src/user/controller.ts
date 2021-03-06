import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import {DateTime} from 'luxon'
import isNil from 'lodash/isNil'
import omit from 'lodash/omit'

import {User} from './model'

// -------------------------------------------------------------------- # Read #

export async function read(req: Request, res: Response) {
  if (!req.user) return res.sendStatus(403)
  res.json(omit(req.user, 'id', 'password'))
}

// ------------------------------------------------------------------ # Update #

export async function update(req: Request, res: Response) {
  if (!req.user) return res.sendStatus(403)

  const $user = await getRepository(User)
  const wasReady = Boolean(req.user.ready)
  const isReady = Boolean(req.body.ready)

  if (!wasReady && isReady) {
    req.user.expiresAt = req.body.expiresAt
  }

  await $user.save({
    ...req.user,
    ...omit(req.body, 'id', 'email', 'createdAt', 'expiresAt'),
  })

  res.sendStatus(204)
}

// ------------------------------------------------------ # Email confirmation #

export async function confirm(req: Request, res: Response) {
  const {token} = req.params
  if (isNil(token)) return res.sendStatus(401)

  const $user = await getRepository(User)
  const user = await $user.findOne({where: {token}})
  if (isNil(user)) return res.sendStatus(401)

  $user.save({...user, emailConfirmed: true, token: null})
  res.sendStatus(204)
}
