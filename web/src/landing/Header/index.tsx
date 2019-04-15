import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import useTheme from '@material-ui/styles/useTheme'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

import Logo from '../../Logo'
import screenshot from './screenshot.jpeg'

import {useStyles} from './styles'

export default function() {
  const theme = useTheme<Theme>()
  const classes = useStyles()

  return (
    <section className={classes.container}>
      <Grid container justify="center" className={classes.grid}>
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Logo
            light={theme.palette.secondary.main}
            dark={theme.palette.secondary.dark}
            width={300}
          />

          <Typography component="h1" variant="h5" className={classes.subTitle}>
            Outil d'aide à la facturation pour les auto-entrepreneurs
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
