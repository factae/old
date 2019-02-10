import React, {useContext} from 'react'
import find from 'lodash/fp/find'
import flow from 'lodash/fp/flow'
import fromPairs from 'lodash/fp/fromPairs'
import isNil from 'lodash/fp/isNil'
import IconSave from '@material-ui/icons/Save'

import * as clientService from '../../../../services/client'
import AsyncContext from '../../../../contexts/async'
import ClientContext from '../../../../contexts/client'
import useRouting from '../../../../hooks/routing'
import Client from '../../../../models/Client'
import {bindModel} from '../../Form'
import Header from '../../Form/Header'
import Section from '../../Form/Section'
import TextField from '../../Form/TextField'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export default function() {
  const async = useContext(AsyncContext)
  const {state: clients, dispatch} = useContext(ClientContext)
  const {match, goBack} = useRouting()
  const id = isNil(match.params.id) ? null : +match.params.id
  const client = isNil(id) ? null : find({id: +id})(clients)

  async function create(client: Client) {
    try {
      const clientWithId = await clientService.create(client)
      dispatch({type: 'create', client: clientWithId})
      goBack()
      async.stop('Client ajouté.')
    } catch (error) {
      console.error(error.message)
      async.stop(`Erreur lors de l'ajout du client !`)
    }
  }

  async function update(client: Client) {
    try {
      await clientService.update(client)
      dispatch({type: 'update', client})
      goBack()
      async.stop('Client modifié.')
    } catch (error) {
      console.error(error.message)
      async.stop(`Erreur lors de la modification du client !`)
    }
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    async.start()

    const client = flow(
      Array.from,
      fromPairs,
    )(new FormData(event.currentTarget)) as Omit<Client, 'id'>

    if (isNil(id)) {
      create({...client, id: -1})
    } else {
      update({...client, id})
    }
  }

  if (!isNil(id) && isNil(client)) {
    return null
  }

  const setProp = bindModel<Client>(client)

  return (
    <form onSubmit={submit}>
      <Header
        title={isNil(id) ? 'Créer un devis' : 'Modifier un client'}
        tooltip="Sauvegarder"
        icon={IconSave}
      />

      <Section title="Informations personnelles">
        <TextField {...setProp('firstName', 'Prénom')} autoFocus />
        <TextField {...setProp('lastName', 'Nom')} />
        <TextField {...setProp('email', 'Email')} type="email" />
        <TextField {...setProp('phone', 'Téléphone')} />
      </Section>

      <Section title="Adresse postale">
        <TextField {...setProp('address', 'Adresse')} />
        <TextField {...setProp('zip', 'Code postal')} type="number" />
        <TextField {...setProp('city', 'Ville')} />
      </Section>

      <Section title="Autre">
        <TextField {...setProp('tvaNumber', 'Numéro de TVA')} optional />
      </Section>
    </form>
  )
}
