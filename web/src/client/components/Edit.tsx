import React, {useContext} from 'react'
import find from 'lodash/fp/find'
import isNil from 'lodash/isNil'
import isNull from 'lodash/isNull'
import IconSave from '@material-ui/icons/Save'

import * as clientService from '../service'
import ClientContext from '../context'
import {Client, emptyClient} from '../model'
import AsyncContext from '../../contexts/async'
import useRouting from '../../hooks/routing'
import useForm from '../../components/Dashboard/Form'
import Header from '../../components/Dashboard/Form/Header'
import Section from '../../components/Dashboard/Form/Section'

export default function() {
  const {match, goBack} = useRouting()
  const async = useContext(AsyncContext)
  const [clients, dispatch] = useContext(ClientContext)

  const id = isNil(match.params.id) ? -1 : Number(match.params.id)
  const defaultClient = find<Client>({id})(clients) || emptyClient
  const client = isNull(clients) ? null : defaultClient
  const {Form, TextField} = useForm<Client>(client)

  async function createOrUpdateClient(nextClient: Client) {
    async.start()

    if (isNull(id)) {
      try {
        const clientWithId = await clientService.create(nextClient)
        dispatch({type: 'create', client: clientWithId})
        async.stop('Client ajouté.')
      } catch (error) {
        console.error(error.message)
        return async.stop(`Erreur lors de l'ajout du client !`)
      }
    } else {
      try {
        const clientWithId = await clientService.update(nextClient)
        dispatch({type: 'update', client: clientWithId})
        async.stop('Client modifié.')
      } catch (error) {
        console.error(error.message)
        return async.stop('Erreur lors de la modification du client !')
      }
    }

    goBack()
  }

  if (!isNull(id) && isNull(client)) {
    return null
  }

  return (
    <Form onSubmit={createOrUpdateClient}>
      <Header
        title={isNull(client) ? 'Ajouter un client' : 'Modifier un client'}
        tooltip="Sauvegarder"
        icon={IconSave}
      />
      <Section title="Informations personnelles">
        <TextField name="firstName" label="Prénom" autoFocus />
        <TextField name="lastName" label="Nom" />
        <TextField name="email" label="Email" type="email" />
        <TextField name="phone" label="Téléphone" />
      </Section>
      <Section title="Adresse postale">
        <TextField name="address" label="Adresse" />
        <TextField name="zip" label="Code postal" type="number" />
        <TextField name="city" label="Ville" />
      </Section>
      <Section title="Autre">
        <TextField name="tvaNumber" label="Numéro de TVA" required={false} />
      </Section>
    </Form>
  )
}
