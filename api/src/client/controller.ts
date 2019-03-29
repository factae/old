import {Request, Response} from 'express'
import omit from 'lodash/fp/omit'
import {getRepository} from 'typeorm'

import {Client} from './model'

// ---------------------------------------------------------------- # Read all #

export async function readAll(req: Request, res: Response) {
  const clientRepository = await getRepository(Client)
  const clients = await clientRepository.find({user: req.user})

  res.json(clients)
}

// ------------------------------------------------------------------ # Create #

export async function create(req: Request, res: Response) {
  const clientRepository = await getRepository(Client)

  const client: Client = {...req.body, user: req.user}
  await clientRepository.save(client)

  res.json(omit('user')(client))
}

// ------------------------------------------------------------------ # Update #

export async function update(req: Request, res: Response) {
  const clientRepository = await getRepository(Client)

  const client = await clientRepository.findOneOrFail({id: req.body.id})
  await clientRepository.update(client, req.body)

  res.sendStatus(204)
}
