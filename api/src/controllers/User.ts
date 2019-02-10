import {Request, Response} from 'express'
import omit from 'lodash/fp/omit'
import {getRepository} from 'typeorm'

import {User} from '../models/User'

// -------------------------------------------------------------------- # Read #

export async function read(req: Request, res: Response) {
  return req.user
    ? res.json(omit(['id', 'password'])(req.user))
    : res.sendStatus(403)
}

// ------------------------------------------------------------------ # Update #

export async function update(req: Request, res: Response) {
  if (!req.user) return res.sendStatus(403)

  const userRepository = await getRepository(User)
  userRepository.save({...req.user, ...omit(['email'])(req.body)})

  return res.sendStatus(204)
}
