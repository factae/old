import React, {useContext} from 'react'
import isNull from 'lodash/fp/isNull'
import IconSave from '@material-ui/icons/Save'

import * as userService from '../../../services/user'
import AsyncContext from '../../../contexts/async'
import ProfileContext from '../../../contexts/profile'
import useRouting from '../../../hooks/routing'
import User from '../../../models/User'
import Header from '../Form/Header'
import Section from '../Form/Section'
import useForm from '../Form'

export default function() {
  const {goBack} = useRouting()
  const {loading, ...async} = useContext(AsyncContext)
  const [profile, dispatch] = useContext(ProfileContext)
  const {Form, Field} = useForm(profile)

  async function updateProfile(profile: User) {
    async.start()

    try {
      await userService.update(profile)
    } catch (error) {
      console.error(error.message)
      return async.stop('Erreur lors de la mise à jour du profil !')
    }

    dispatch({type: 'update', profile})
    async.stop('Profil mis à jour.')
    goBack()
  }

  if (isNull(profile)) {
    return null
  }

  return (
    <Form onSubmit={updateProfile}>
      <Header title="Profil" tooltip="Sauvegarder" icon={IconSave} />

      <Section title="Informations personnelles">
        <Field name="firstName" label="Prénom" autoFocus />
        <Field name="lastName" label="Nom" />
        <Field name="email" label="Email" type="email" disabled />
        <Field name="phone" label="Téléphone" />
      </Section>

      <Section title="Adresse postale">
        <Field name="address" label="Adresse" />
        <Field name="zip" label="Code postal" type="number" />
        <Field name="city" label="Ville" />
      </Section>

      <Section title="Auto-entrepreneur">
        <Field name="siren" label="Siren" />
        <Field name="apeCode" label="Code APE" optional />
        <Field name="tvaNumber" label="Numéro de TVA" optional />
      </Section>
    </Form>
  )
}
