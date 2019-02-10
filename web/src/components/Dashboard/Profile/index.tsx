import React, {useContext} from 'react'
import flow from 'lodash/fp/flow'
import fromPairs from 'lodash/fp/fromPairs'
import isNull from 'lodash/fp/isNull'
import IconSave from '@material-ui/icons/Save'

import * as userService from '../../../services/user'
import AsyncContext from '../../../contexts/async'
import ProfileContext from '../../../contexts/profile'
import useRouting from '../../../hooks/routing'
import User from '../../../models/User'
import Header from '../Form/Header'
import Section from '../Form/Section'
import TextField from '../Form/TextField'
import {bindModel} from '../Form'

export default function() {
  const {loading, ...async} = useContext(AsyncContext)
  const {state: profile, dispatch} = useContext(ProfileContext)
  const {goBack} = useRouting()

  async function updateProfile(profile: User) {
    try {
      await userService.update(profile)
      dispatch({type: 'update', profile})
      goBack()
      async.stop('Profil mis à jour.')
    } catch (error) {
      console.error(error.message)
      async.stop('Erreur lors de la mise à jour du profil !')
    }
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    async.start()

    const profile = flow(
      Array.from,
      fromPairs,
    )(new FormData(event.currentTarget)) as User

    updateProfile(profile)
  }

  if (isNull(profile)) {
    return null
  }

  const setProp = bindModel<User>(profile)

  return (
    <form onSubmit={submit}>
      <Header title="Profil" tooltip="Sauvegarder" icon={IconSave} />

      <Section title="Informations personnelles">
        <TextField {...setProp('firstName', 'Nom')} autoFocus />
        <TextField {...setProp('lastName', 'Prénom')} />
        <TextField {...setProp('email', 'Email')} type="email" disabled />
        <TextField {...setProp('phone', 'Téléphone')} />
      </Section>

      <Section title="Adresse postale">
        <TextField {...setProp('address', 'Adresse')} />
        <TextField {...setProp('zip', 'Code postal')} type="number" />
        <TextField {...setProp('city', 'Ville')} />
      </Section>

      <Section title="Auto-entrepreneur">
        <TextField {...setProp('siren', 'Siren')} />
        <TextField {...setProp('apeCode', 'Code APE')} />
        <TextField {...setProp('tvaNumber', 'Numéro de TVA')} optional />
      </Section>
    </form>
  )
}
