import React, {useContext} from 'react'
import find from 'lodash/fp/find'
import isNil from 'lodash/fp/isNil'
import isNull from 'lodash/fp/isNull'
import IconSave from '@material-ui/icons/Save'

import * as clientService from '../../../services/client'
import AsyncContext from '../../../contexts/async'
import ClientContext from '../../../contexts/client'
import useRouting from '../../../hooks/routing'
import Client from '../../../models/Client'
import useForm from '../Form'
import Header from '../Form/Header'
import Section from '../Form/Section'

export default function() {
  const {match, goBack} = useRouting()
  const async = useContext(AsyncContext)
  const [clients, dispatch] = useContext(ClientContext)

  const id = isNil(match.params.id) ? null : Number(match.params.id)
  const client = isNull(id) ? null : find<Client>({id})(clients) || null
  const {Form, Field} = useForm(client)

  async function createOrUpdateClient(client: Client) {
    async.start()

    if (isNull(id)) {
      try {
        const clientWithId = await clientService.create({...client, id: -1})
        dispatch({type: 'create', client: clientWithId})
        async.stop('Client ajouté.')
      } catch (error) {
        console.error(error.message)
        return async.stop(`Erreur lors de l'ajout du client !`)
      }
    } else {
      try {
        const clientWithId = await clientService.update({...client, id})
        dispatch({type: 'update', client: clientWithId})
        async.stop('Client modifié.')
      } catch (error) {
        console.error(error.message)
        return async.stop(`Erreur lors de la modification du client !`)
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
        <Field name="firstName" label="Prénom" autoFocus />
        <Field name="lastName" label="Nom" />
        <Field name="email" label="Email" type="email" />
        <Field name="phone" label="Téléphone" />
      </Section>

      <Section title="Adresse postale">
        <Field name="address" label="Adresse" />
        <Field name="zip" label="Code postal" type="number" />
        <Field name="city" label="Ville" />
      </Section>

      <Section title="Autre">
        <Field name="tvaNumber" label="Numéro de TVA" optional />
      </Section>
    </Form>
  )
}
