import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import screenshot from './screenshot.jpeg'

import {useStyles} from './styles'

export default function() {
  const classes = useStyles()

  return (
    <section className={classes.container}>
      <Grid container justify="center" className={classes.grid}>
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Typography component="h1" variant="h1">
            factAE
          </Typography>

          <Typography component="h2" variant="h5" className={classes.subTitle}>
            L'outil d'aide à la facturation pour les auto-entrepreneurs
          </Typography>

          <div className={classes.screenshotContainer}>
            <Paper className={classes.screenshot} elevation={16}>
              <img src={screenshot} width="100%" />
            </Paper>
          </div>
        </Grid>
      </Grid>
    </section>
  )
}
