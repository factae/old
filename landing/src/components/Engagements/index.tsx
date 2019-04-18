import React, {Fragment} from 'react'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import IconSecure from '@material-ui/icons/Https'
import IconPrivacy from '@material-ui/icons/VerifiedUser'
import IconTrial from '@material-ui/icons/Event'
import IconNoAds from '@material-ui/icons/Block'
import IconOpenSource from '@material-ui/icons/Code'
import IconSimple from '@material-ui/icons/AccessibilityNew'
import IconSupport from '@material-ui/icons/ContactSupport'
import IconUpdate from '@material-ui/icons/Sync'

import Engagement from './Engagement'

import {useStyles} from './styles'

export default function() {
  const classes = useStyles()

  return (
    <section className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography component="h2" variant="h3" className={classes.title}>
            <strong>factAE</strong>, c'est :
          </Typography>

          <Grid container direction="row" spacing={16}>
            <Engagement
              icon={IconTrial}
              title="Un mois d'essai"
              subtitle="Ainsi qu'un mois gratuit supplémentaire pour tout parrainage réussi."
            />

            <Engagement
              icon={IconSecure}
              title="100% sécurisé"
              subtitle={
                <Fragment>
                  Connexion HTTPS, paiement sécurisé par carte bancaire avec{' '}
                  <Link
                    href="https://stripe.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {' '}
                    Stripe
                  </Link>
                  .
                </Fragment>
              }
            />

            <Engagement
              icon={IconPrivacy}
              title="Respect vie privée"
              subtitle="Vos données ne sont ni analysées, ni vendues. Paiements anonymes."
            />

            <Engagement
              icon={IconNoAds}
              title="Pas de pubs"
              subtitle="Aucune publicité. Les seules sources de revenu sont l'abonnement et les dons."
            />

            <Engagement
              icon={IconSimple}
              title="Simplicité"
              subtitle="factAE se veut aussi simplifié que la comptabilité des auto-entrepreneurs. Par conséquent, factAE refuse toute certification comptable."
            />

            <Engagement
              icon={IconUpdate}
              title="Mise à jour"
              subtitle={
                <Fragment>
                  Mises à jour fréquentes de l'outil, vérification journalière
                  du serveur (hébergé chez{' '}
                  <Link
                    href="https://www.ovh.com/fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OVH
                  </Link>
                  ).
                </Fragment>
              }
            />

            <Engagement
              icon={IconOpenSource}
              title="Open source"
              subtitle={
                <Fragment>
                  Le code source est disponible en ligne, sur{' '}
                  <Link
                    href="https://github.com/soywod/factae"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {' '}
                    GitHub
                  </Link>
                  .
                </Fragment>
              }
            />

            <Engagement
              icon={IconSupport}
              title="Support"
              subtitle="Une question ? Une remarque ? Une idée d'amélioration ? factAE est à votre écoute."
            />
          </Grid>
        </Grid>
      </Grid>
    </section>
  )
}
