import React from 'react'
import Badge from '@material-ui/core/Badge'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import useTheme from '@material-ui/styles/useTheme'
import {Theme} from '@material-ui/core/styles/createMuiTheme'
import Logo from 'common/components/Logo'

// @ts-ignore
import bread from '../../images/bread.png'

// @ts-ignore
import screenshot from '../../images/screenshot.png'

import {useStyles} from './styles'

export default function() {
  const theme = useTheme<Theme>()
  const classes = useStyles()

  return (
    <section className={classes.container}>
      <Grid className={classes.grid} container justify="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Logo
            light={theme.palette.secondary.main}
            dark={theme.palette.secondary.dark}
            width={300}
          />

          <Typography className={classes.subTitle} component="h1" variant="h5">
            L'outil de facturation au prix d'une baguette
            <Badge
              className={classes.badge}
              color="secondary"
              badgeContent="1€"
            >
              <img className={classes.icon} src={bread} />
            </Badge>
          </Typography>

          <div className={classes.screenshotContainer}>
            <img className={classes.screenshot} src={screenshot} />
          </div>
        </Grid>
      </Grid>
    </section>
  )
}
