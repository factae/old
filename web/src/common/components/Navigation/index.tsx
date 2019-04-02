import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import IconProfile from '@material-ui/icons/AccountCircle'

import AsyncContext from '../../../common/contexts/async'
import useAuth from '../../../auth/hook'
import useRouting from '../../../common/hooks/routing'

import {useStyles} from './styles'

export default function() {
  const {loading} = React.useContext(AsyncContext)
  const classes = useStyles()
  const auth = useAuth(document.cookie)
  const {goTo} = useRouting()

  return (
    <AppBar position="relative" className={classes.navigation}>
      <Toolbar>
        <Typography
          variant="h5"
          color="inherit"
          className={classes.brand}
          onClick={goTo(auth ? 'dashboard' : 'login')}
        >
          <span className={classes.title}>factAE</span>
        </Typography>

        {auth && (
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
        )}
      </Toolbar>
      {loading && <LinearProgress className={classes.progress} />}
    </AppBar>
  )
}
