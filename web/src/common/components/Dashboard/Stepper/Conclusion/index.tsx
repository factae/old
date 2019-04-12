import React, {Fragment} from 'react'
import {DateTime} from 'luxon'
import Typography from '@material-ui/core/Typography'

import useForm from '../../../../../common/form'
import Section from '../../../../../common/form/Section'
import Submit from '../Submit'
import {User} from '../../../../../user/model'
import useUserContext from '../../../../../user/context'
import * as $user from '../../../../../user/service'

import {useStyles} from './styles'

export default function() {
  const [user, setUser] = useUserContext()
  const {Form} = useForm(null)
  const classes = useStyles()

  async function finish() {
    if (!user) return

    const nextUser: User = {
      ...user,
      ready: true,
      premium: DateTime.local().plus({month: 1}),
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

        <Typography gutterBottom>
          Il ne vous reste plus qu'à créer votre premier client, et vous serez
          prêt à générer des devis et des factures.
        </Typography>

        <Typography gutterBottom>
          factAE est un outil gratuit (et open source). Cependant il possède un
          mode Premium qui vous donne accès à de nombreuses fonctionalités
          supplémentaires, telles que :
        </Typography>

        <ul>
          <Typography component="li">
            - Transformer un devis en facture
          </Typography>
          <Typography component="li">
            - Créer un devis / une facture à partir d'un modèle
          </Typography>
          <Typography component="li">
            - Envoyer automatiquement les devis et les factures aux clients
          </Typography>
          <Typography component="li">
            - Envoyer des formulaires d'inscription à vos nouveaux clients
          </Typography>
        </ul>

        <Typography gutterBottom>
          En vous abonnant, vous bénéficiez de toutes ces fonctionnalités, +
          toutes les fonctionnalités à venir.
        </Typography>

        <br />

        <Typography variant="h6" gutterBottom>
          Une fois cliqué sur <em>Terminer</em>, vous recevrez 1 mois gratuit en
          guise de bienvenue :)
        </Typography>

        <Section title="">
          <Submit />
        </Section>
      </Form>
    </Fragment>
  )
}
