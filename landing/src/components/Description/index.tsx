import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import {useStyles} from './styles'

export default function() {
  const classes = useStyles()

  return (
    <section className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography component="p" variant="h3" className={classes.title}>
            <strong>factAE</strong> est un outil de facturation pour
            auto-entrepreneurs à <strong>1 €/mois</strong>
          </Typography>

          <Typography
            component="p"
            variant="h6"
            className={classes.description}
          >
            De nombreux outils existent sur le marché, mais aucun ne correspond
            réellement aux besoins des auto-entrepreneurs. L'objectif de factAE
            est simple : gérer ses clients, ses devis et ses factures{' '}
            <strong>facilement</strong> et <strong>efficacement</strong>. Rien
            de plus.
          </Typography>
        </Grid>
      </Grid>
    </section>
  )
}
