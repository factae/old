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
          <Typography className={classes.text} variant="body2">
            <strong>factAE</strong> est un outil open source sous licence MIT.
          </Typography>

          <Typography
            className={classes.copyright}
            variant="body2"
            gutterBottom
          >
            <a
              className={classes.text}
              href="https://github.com/soywod/factae/blob/master/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
            >
              Copyright © 2019 Clément DOUIN
            </a>
          </Typography>

          <Typography className={classes.text} variant="body2" gutterBottom>
            Développement :{' '}
            <a
              className={classes.text}
              href="https://soywod.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              Clément DOUIN
            </a>
          </Typography>

          <Typography className={classes.text} variant="body2" gutterBottom>
            Design :{' '}
            <a
              className={classes.text}
              href="https://material-ui.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Material-UI
            </a>
            ,{' '}
            <a
              className={classes.text}
              href="http://www.dogms.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              DOGMS
            </a>
          </Typography>

          <Typography className={classes.text} variant="body2" gutterBottom>
            Comptabilité :
          </Typography>

          <Typography className={classes.text} variant="body2" gutterBottom>
            Réseaux sociaux :{' '}
            <a
              className={classes.text}
              href="https://github.com/soywod/factae"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Typography>
        </Grid>
      </Grid>
    </section>
  )
}
