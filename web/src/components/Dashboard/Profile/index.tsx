import React, {useContext} from 'react'
import IconSave from '@material-ui/icons/Save'

import * as userService from '../../../services/user'
import ProfileContext from '../../../contexts/profile'
import User from '../../../models/User'
import Header from '../Form/Header'
import Section from '../Form/Section'
import useForm from '../Form'

export default function() {
  const [defaultProfile, dispatch] = useContext(ProfileContext)
  const {Form, TextField} = useForm<User>(defaultProfile)

  async function updateProfile(profile: User) {
    await userService.update(profile)
    dispatch({type: 'update', profile})
  }

  return (
    <Form onSubmit={updateProfile}>
      <Header title="Profil" label="Sauvegarder" icon={IconSave} />

      <Section title="Informations personnelles">
        <TextField name="firstName" label="Prénom" autoFocus />
        <TextField name="lastName" label="Nom" />
        <TextField name="email" label="Email" type="email" disabled />
        <TextField name="phone" label="Téléphone" />
      </Section>

      <Section title="Adresse postale">
        <TextField name="address" label="Adresse" />
        <TextField name="zip" label="Code postal" type="number" />
        <TextField name="city" label="Ville" />
      </Section>

      <Section title="Auto-entrepreneur">
        <TextField name="siren" label="Siren" />
        <TextField name="apeCode" label="Code APE" />
        <TextField name="tvaNumber" label="Numéro de TVA" required={false} />
      </Section>
    </Form>
  )
}
