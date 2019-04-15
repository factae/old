import React from 'react'
import find from 'lodash/fp/find'
import isNil from 'lodash/isNil'
import isNull from 'lodash/isNull'

import * as clientService from '../service'
import useClientContext from '../context'
import {Client, emptyClient} from '../model'
import useRouting from '../../common/hooks/routing'
import useForm from '../../common/form'
import Header from '../../common/form/Header'
import Section from '../../common/form/Section'
import Submit from '../../common/form/Submit'

export default function() {
  const {goTo, match} = useRouting<{id: number}>()
  const [clients, dispatch] = useClientContext()

  const id = isNil(match.params.id) ? -1 : Number(match.params.id)
  const defaultClient = find<Client>({id})(clients) || emptyClient
  const client = isNull(clients) ? null : defaultClient
  const {Form, TextField} = useForm<Client>(client)

  async function createOrUpdateClient(nextClient: Client) {
    if (id === -1) {
      const clientWithId = await clientService.create(nextClient)
      dispatch({type: 'create', client: clientWithId})
    } else {
      const clientWithId = await clientService.update(nextClient)
      dispatch({type: 'update', client: clientWithId})
    }
  }

  if (id > -1 && isNull(client)) {
    return null
  }

  return (
    <Form
      onSubmit={createOrUpdateClient}
      onSuccess={{message: 'Client enregistré.', goTo: 'client'}}
      onError={{message: "Erreur lors de l'enregistrement du client !"}}
    >
      <Header
        title={id === -1 ? 'Ajouter un client' : 'Modifier un client'}
        onBack={() => goTo('client')}
      />

      <Section title="Société">
        <TextField name="tradingName" label="Nom commercial" required={false} />
        <TextField name="siren" label="Siren" required={false} />
      </Section>

      <Section title="Contact">
        <TextField name="firstName" label="Prénom" autoFocus />
        <TextField name="lastName" label="Nom" />
        <TextField name="email" label="Email" type="email" />
        <TextField name="phone" label="Téléphone" />
        <TextField name="address" label="Adresse" />
        <TextField name="zip" label="Code postal" />
        <TextField name="city" label="Ville" />
        <TextField name="country" label="Pays" />
      </Section>

      <Submit />
    </Form>
  )
}
