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
            <strong>factAE</strong> est un outil d'aide
            <br /> à la facturation pour les auto-entrepreneurs.
          </Typography>
          <Typography
            component="p"
            variant="h6"
            className={classes.description}
          >
            Il existe de nombreux outils sur le marché, mais ils sont trop
            complexes. Les auto-entrepreneurs, ayant une comptabilité
            simplifiée, n'ont pas besoin de toutes les fonctionnalités qu'ils
            proposent. factAE répond à ce besoin : il vous aide à gérer vos
            clients, vos devis et vos factures simplement. Rien de plus.
          </Typography>
        </Grid>
      </Grid>
    </section>
  )
}
