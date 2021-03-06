import React, {Fragment, MouseEvent, useState} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {Theme} from '@material-ui/core/styles/createMuiTheme'
import useTheme from '@material-ui/styles/useTheme'
import IconMenu from '@material-ui/icons/Menu'
import IconClient from '@material-ui/icons/People'
import IconDocument from '@material-ui/icons/AssignmentOutlined'
import IconProfile from '@material-ui/icons/Face'
import IconSettings from '@material-ui/icons/Settings'
import IconLogout from '@material-ui/icons/PowerSettingsNew'

import Logo from '../../../.common/components/Logo'
import useAuthContext from '../../../auth/context'
import useAsyncContext from '../../../async/context'
import useRouting, {Route} from '../../../common/hooks/routing'

import {useStyles} from './styles'

export default function() {
  const {auth, logout} = useAuthContext()
  const async = useAsyncContext()
  const routing = useRouting()
  const [anchorEl, setLocalAnchorEl] = useState<HTMLElement | null>(null)
  const theme = useTheme<Theme>()
  const classes = useStyles()

  function setAnchorEl(event: MouseEvent) {
    setLocalAnchorEl(event.currentTarget as HTMLElement)
  }

  function closeMenu() {
    setLocalAnchorEl(null)
  }

  function goTo(route: Route) {
    return () => {
      routing.goTo(route)
      closeMenu()
    }
  }

  async function handleLogout() {
    try {
      async.start()
      closeMenu()
      await logout()
      async.stop()
    } catch (error) {
      console.error(error.message)
      async.stop(`Erreur : ${error.message}`)
    }
  }

  return (
    <AppBar position="relative" className={classes.navigation}>
      <Toolbar>
        <Typography variant="h5" color="inherit" className={classes.brand}>
          <Logo
            onClick={goTo('dashboard')}
            light={theme.palette.grey[200]}
            dark={theme.palette.grey[300]}
            height={23}
          />
        </Typography>

        {auth ? (
          <Fragment>
            <IconButton
              aria-owns={anchorEl ? 'menu' : undefined}
              color="inherit"
              onClick={setAnchorEl}
              disabled={async.loading}
            >
              <IconMenu />
            </IconButton>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeMenu}
            >
              <MenuItem onClick={goTo('client')}>
                <IconClient className={classes.icon} /> Clients
              </MenuItem>
              <MenuItem onClick={goTo('document')}>
                <IconDocument className={classes.icon} /> Documents
              </MenuItem>
              <MenuItem onClick={goTo('profile')}>
                <IconProfile className={classes.icon} /> Profil
              </MenuItem>
              <Divider />
              <MenuItem onClick={goTo('settings')}>
                <IconSettings className={classes.icon} /> Paramètres
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <IconLogout className={classes.icon} /> Déconnexion
              </MenuItem>
            </Menu>
          </Fragment>
        ) : (
          <Fragment>
            <Button
              className={classes.button}
              variant="text"
              onClick={goTo('register')}
              disabled={async.loading}
            >
              Créer un compte
            </Button>
            <Button
              className={classes.button}
              variant="text"
              onClick={goTo('login')}
              disabled={async.loading}
            >
              Se connecter
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  )
}
