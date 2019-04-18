import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import useTheme from '@material-ui/styles/useTheme'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

import Logo from 'common/components/Logo'
import {useStyles} from './styles'

export default function() {
  const theme = useTheme<Theme>()
  const classes = useStyles()

  return (
    <AppBar position="relative" className={classes.navigation}>
      <Toolbar>
        <Typography variant="h5" color="inherit" className={classes.brand}>
          <Logo
            light={theme.palette.grey[200]}
            dark={theme.palette.grey[300]}
            height={23}
          />
        </Typography>
        <Button
          className={classes.button}
          variant="text"
          href="https://app.factae.fr/register"
          target="_blank"
          rel="noopener noreferrer"
        >
          Créer un compte
        </Button>
        <Button
          className={classes.button}
          variant="text"
          href="https://app.factae.fr/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          Se connecter
        </Button>
      </Toolbar>
    </AppBar>
  )
}
