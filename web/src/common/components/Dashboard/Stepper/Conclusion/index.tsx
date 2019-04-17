import React, {Fragment} from 'react'
import {DateTime} from 'luxon'
import Typography from '@material-ui/core/Typography'

import useForm from '../../../../../common/form'
import Submit from '../Submit'
import {User} from '../../../../../user/model'
import useUserContext from '../../../../../user/context'
import * as $user from '../../../../../user/service'

import {useStyles} from './styles'

export default function() {
  const [user, setUser] = useUserContext()
  const {Form, submit} = useForm(null)
  const classes = useStyles()

  async function finish() {
    if (!user) return

    const nextUser: User = {
      ...user,
      ready: true,
      expiresAt: DateTime.local()
        .plus({month: 1})
        .toISO(),
    }

    await $user.update(nextUser)
    setUser(nextUser)
  }

  return (
    <Fragment>
      <Form
        className={classes.form}
        onSubmit={finish}
        onSuccess={{message: ''}}
        onError={{message: "Erreur lors de l'enregistrement."}}
      >
        <Typography component="h2" variant="h4" gutterBottom>
          Configuration terminée !
        </Typography>

        <Typography gutterBottom>Vos prochaines étapes :</Typography>

        <ul>
          <Typography component="li">
            - Sélectionner les options qui vous intéressent dans l'onglet
            "Paramètres"
          </Typography>
          <Typography component="li">- Ajouter votre premier client</Typography>
          <Typography component="li">
            - Créer vos documents (devis, facture, avoirs)
          </Typography>
          <Typography component="li">
            - Superviser votre activité avec l'onglet "Statistiques"
          </Typography>
          <Typography component="li">
            - Parrainer vos proches pour gagner des mois d'abonnement gratuit
          </Typography>
        </ul>
      </Form>

      <Submit onNext={submit} />
    </Fragment>
  )
}
