import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Feature from './Feature'

import {useStyles} from './styles'

export default function() {
  const classes = useStyles()

  return (
    <section className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography component="h2" variant="h3" className={classes.title}>
            Fonctionnalités
          </Typography>

          <Grid container direction="row" spacing={16}>
            <Feature>Gestion de clients</Feature>
            <Feature>Gestion de documents (devis, factures, avoirs)</Feature>
            <Feature>Transformation des devis en facture</Feature>
            <Feature>Création de documents à partir de templates</Feature>
            <Feature>Relances auto</Feature>
            <Feature>Envoi auto de documents au client</Feature>
            <Feature>Envoi de formulaires d'inscription aux prospects</Feature>
            <Feature>Visualisation du chiffre d'affaire en temps réel</Feature>
            <Feature>
              Alertes en cas de dépacement de plafond (TVA, auto-entreprise)
            </Feature>
          </Grid>
        </Grid>
      </Grid>
    </section>
  )
}
