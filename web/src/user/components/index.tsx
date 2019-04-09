import React from 'react'
import keys from 'lodash/keys'
import isNaN from 'lodash/isNaN'
import IconSave from '@material-ui/icons/Save'

import useRouting from '../../common/hooks/routing'
import useForm from '../../common/form'
import Header from '../../common/form/Header'
import Section from '../../common/form/Section'
import * as $user from '../service'
import useUserContext from '../context'
import {User, RateUnit, Activity} from '../model'

export default function() {
  const [defaultUser, setUser] = useUserContext()
  const {Form, TextField, Select} = useForm<User>(defaultUser)
  const {goTo} = useRouting()

  async function updateUser(nextUser: User) {
    await $user.update(nextUser)
    setUser(nextUser)
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

  function renderActivity(activity: Activity) {
    switch (activity) {
      case Activity.trade:
        return 'Commerce ou hébergement'

      case Activity.service:
        return 'Prestation de service'
    }
  }

  return (
    <Form
      onSubmit={updateUser}
      onSuccess={{message: 'Profil enregistré.', goTo: 'dashboard'}}
      onError={{message: "Erreur lors de l'enregistrement du profil !"}}
    >
      <Header
        title="Profil"
        onBack={() => goTo('dashboard')}
        action={{
          label: 'Sauvegarder',
          icon: IconSave,
        }}
      />

      <Section title="Identité personnelle">
        <TextField name="firstName" label="Prénom" autoFocus />
        <TextField name="lastName" label="Nom de famille" />
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
        <Select name="activity" label="Type d'activité">
          {keys(Activity)
            .filter(activity => !isNaN(Number(activity)))
            .map(activity => (
              <option key={activity} value={activity}>
                {renderActivity(Number(activity))}
              </option>
            ))}
        </Select>
        <TextField name="tradingName" label="Nom commercial" required={false} />
        <TextField
          name="rate"
          label="Tarif (€)"
          type="number"
          required={false}
        />
        <Select name="rateUnit" label="Unité" required={false}>
          {keys(RateUnit)
            .filter(unit => !isNaN(Number(unit)))
            .map(unit => (
              <option key={unit} value={unit}>
                {renderRate(Number(unit))}
              </option>
            ))}
        </Select>
        <TextField
          name="quotationConditions"
          label="Conditions des devis"
          multiline
          rows={4}
          grid={{xs: 12}}
          required={false}
        />
        <TextField
          name="invoiceConditions"
          label="Conditions des factures"
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
        title="N° TVA Intracom."
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
