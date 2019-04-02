import {Request, Response} from 'express'
import omit from 'lodash/omit'
import {getRepository} from 'typeorm'

import {User} from './model'

// -------------------------------------------------------------------- # Read #

export async function read(req: Request, res: Response) {
  return req.user
    ? res.json(omit(req.user, 'id', 'password'))
    : res.sendStatus(403)
}

// ------------------------------------------------------------------ # Update #

export async function update(req: Request, res: Response) {
  if (!req.user) return res.sendStatus(403)

  const userRepository = await getRepository(User)
  userRepository.save({...req.user, ...omit(req.body, 'email')})

  return res.sendStatus(204)
}
