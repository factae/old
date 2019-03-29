import React, {useContext} from 'react'
import keys from 'lodash/keys'
import isNaN from 'lodash/isNaN'
import IconSave from '@material-ui/icons/Save'

import useForm from '../../common/form'
import Header from '../../common/form/Header'
import Section from '../../common/form/Section'
import * as userService from '../service'
import UserContext from '../context'
import {User, RateUnit} from '../model'

export default function() {
  const [defaultUser, dispatch] = useContext(UserContext)
  const {Form, TextField, Select} = useForm<User>(defaultUser)

  async function updateUser(user: User) {
    await userService.update(user)
    dispatch({type: 'update', user})
  }

  function renderRate(unit: RateUnit) {
    switch (unit) {
      case RateUnit.hour:
        return 'Par heure'

      case RateUnit.day:
        return 'Par jour'

      case RateUnit.service:
        return 'Par prestation'
    }
  }

  return (
    <Form main onSubmit={updateUser}>
      <Header title="Profil" label="Sauvegarder" icon={IconSave} />

      <Section title="Identité">
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
        <TextField name="rate" label="Tarif" type="number" required={false} />
        <Select name="rateUnit" label="Unité de tarif" required={false}>
          {keys(RateUnit)
            .filter(unit => !isNaN(Number(unit)))
            .map(unit => (
              <option key={unit} value={unit}>
                {renderRate(Number(unit))}
              </option>
            ))}
        </Select>
        <TextField
          name="conditions"
          label="Conditions"
          placeholder="Conditions de paiement, de livraison, d'exécution, de SAV ..."
          multiline
          rows={4}
          grid={{xs: 12}}
          required={false}
        />
      </Section>

      <Section
        title="Banque"
        subtitle="Vos coordonnées bancaires ne seront utilisées que pour la génération des devis et des factures."
      >
        <TextField name="rib" label="RIB" />
        <TextField name="iban" label="IBAN" />
        <TextField name="bic" label="BIC" />
      </Section>

      <Section
        title="TVA"
        subtitle="Renseignez uniquement si vous êtes assujetti à la TVA."
      >
        <TextField name="taxId" label="Numéro de TVA" required={false} />
        <TextField
          name="taxRate"
          label="Taux de TVA (%)"
          type="number"
          required={false}
        />
      </Section>
    </Form>
  )
}
