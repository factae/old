import React, {Fragment, MouseEvent, useState} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconMenu from '@material-ui/icons/Menu'
import IconClient from '@material-ui/icons/People'
import IconQuotation from '@material-ui/icons/AssignmentOutlined'
import IconInvoice from '@material-ui/icons/EuroSymbol'
import IconProfile from '@material-ui/icons/Face'
import IconContact from '@material-ui/icons/ContactSupport'
import IconLogout from '@material-ui/icons/PowerSettingsNew'

import {isAuth, useLogout} from '../../../auth/hooks'
import useRouting, {Route} from '../../../common/hooks/routing'

import {useStyles} from './styles'

export default function() {
  const classes = useStyles()
  const handleLogout = useLogout()
  const routing = useRouting()
  const [anchorEl, setLocalAnchorEl] = useState<HTMLElement | null>(null)
  const auth = isAuth()

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

  function logout() {
    closeMenu()
    handleLogout()
  }

  return (
    <AppBar position="relative" className={classes.navigation}>
      <Toolbar>
        <Typography
          variant="h5"
          color="inherit"
          className={classes.brand}
          onClick={goTo(auth ? 'dashboard' : 'landing')}
        >
          <span className={classes.title}>factAE</span>
        </Typography>

        {auth ? (
          <Fragment>
            <IconButton
              aria-owns={anchorEl ? 'menu' : undefined}
              color="inherit"
              onClick={setAnchorEl}
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
              <MenuItem onClick={goTo('quotation')}>
                <IconQuotation className={classes.icon} /> Devis
              </MenuItem>
              <MenuItem onClick={goTo('invoice')}>
                <IconInvoice className={classes.icon} /> Factures
              </MenuItem>
              <MenuItem onClick={goTo('profile')}>
                <IconProfile className={classes.icon} /> Profil
              </MenuItem>
              <Divider />
              <MenuItem disabled>
                <IconContact className={classes.icon} /> Contact
              </MenuItem>
              <MenuItem onClick={logout}>
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
            >
              Créer un compte
            </Button>
            <Button
              className={classes.button}
              variant="text"
              onClick={goTo('login')}
            >
              Se connecter
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  )
}
