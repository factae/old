import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import IconProfile from '@material-ui/icons/AccountCircle'

import AsyncContext from '../../../contexts/async'
import useRouting from '../../../hooks/routing'
import {useStyles} from './styles'

export default function() {
  const {loading} = React.useContext(AsyncContext)
  const classes = useStyles()
  const {goTo} = useRouting()

  return (
    <AppBar position="relative" className={classes.navigation}>
      <Toolbar>
        <Typography
          variant="h5"
          color="inherit"
          className={classes.title}
          onClick={goTo('dashboard')}
        >
          FactAE
        </Typography>

        <Tooltip title="Profil" aria-label="Profil">
          <IconButton
            aria-owns="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={goTo('profile')}
          >
            <IconProfile />
          </IconButton>
        </Tooltip>
      </Toolbar>
      {loading && <LinearProgress className={classes.progress} />}
    </AppBar>
  )
}
