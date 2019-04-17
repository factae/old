import React, {Fragment} from 'react'
import keys from 'lodash/keys'

import {User, Activity, RateUnit} from '../../../../../user/model'
import useUserContext from '../../../../../user/context'
import * as $user from '../../../../../user/service'
import useForm from '../../../../../common/form'
import Section from '../../../../../common/form/Section'
import useStepperContext from '../context'
import Submit from '../Submit'

import {useStyles} from './styles'

export default function() {
  const [defaultUser, setUser] = useUserContext()
  const {nextStep} = useStepperContext()
  const {Form, TextField, Select, submit} = useForm<User>(defaultUser)
  const classes = useStyles()

  async function updateUser(nextUser: User) {
    await $user.update(nextUser)
    setUser(nextUser)
    nextStep()
  }

  return (
    <Fragment>
      <Form
        className={classes.form}
        onSubmit={updateUser}
        onSuccess={{message: ''}}
        onError={{message: "Erreur lors de l'enregistrement."}}
      >
        <Section title="Identité">
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
          <TextField
            name="tradingName"
            label="Nom commercial (optionnel)"
            required={false}
          />
        </Section>

        <Section
          title="Tarification par défaut"
          subtitle="Correspond au taux horaire / journalier / forfaitaire qui s'affichera par défaut sur vos devis."
        >
          <TextField
            name="rate"
            label="Montant (€)"
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
        </Section>
        <Section
          title="Conditions"
          subtitle="Correspond aux conditions (de paiement, de livraison, d'exécution etc) qui s'afficheront par défaut sur vos documents. Champs libres."
        >
          <TextField
            name="quotationConditions"
            label="Devis"
            multiline
            rows={4}
            grid={{xs: 12}}
          />
          <TextField
            name="invoiceConditions"
            label="Factures"
            multiline
            rows={4}
            grid={{xs: 12}}
          />
        </Section>
      </Form>

      <Submit onNext={submit} />
    </Fragment>
  )
}

function renderActivity(activity: Activity) {
  switch (activity) {
    case Activity.trade:
      return 'Commerce ou hébergement'

    case Activity.service:
      return 'Prestation de service'
  }
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
