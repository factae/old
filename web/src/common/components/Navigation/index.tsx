import React, {Fragment, MouseEvent, useContext, useState} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
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

import AsyncContext from '../../../common/contexts/async'
import {useCheckAuth, useLogout} from '../../../auth/hooks'
import useRouting from '../../../common/hooks/routing'

import {useStyles} from './styles'

export default function() {
  const {loading} = useContext(AsyncContext)
  const classes = useStyles()
  const handleLogout = useLogout()
  const isAuth = useCheckAuth(document.cookie)
  const {goTo} = useRouting()
  const [anchorEl, setLocalAnchorEl] = useState<HTMLElement | null>(null)

  function setAnchorEl(event: MouseEvent) {
    setLocalAnchorEl(event.currentTarget as HTMLElement)
  }

  function closeMenu() {
    setLocalAnchorEl(null)
  }

  function goToClients() {
    goTo('client')
    closeMenu()
  }

  function goToQuotations() {
    goTo('quotation')
    closeMenu()
  }

  function goToInvoices() {
    goTo('invoice')
    closeMenu()
  }

  function goToProfile() {
    goTo('profile')
    closeMenu()
  }

  function goToContact() {
    /* goTo('contact') */
    closeMenu()
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
          onClick={() => goTo(isAuth ? 'dashboard' : 'login')}
        >
          <span className={classes.title}>factAE</span>
        </Typography>

        {isAuth && (
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
              <MenuItem onClick={goToClients}>
                <IconClient className={classes.icon} /> Clients
              </MenuItem>
              <MenuItem onClick={goToQuotations}>
                <IconQuotation className={classes.icon} /> Devis
              </MenuItem>
              <MenuItem onClick={goToInvoices}>
                <IconInvoice className={classes.icon} /> Factures
              </MenuItem>
              <MenuItem onClick={goToProfile}>
                <IconProfile className={classes.icon} /> Profil
              </MenuItem>
              <Divider />
              <MenuItem onClick={goToContact}>
                <IconContact className={classes.icon} /> Contact
              </MenuItem>
              <MenuItem onClick={logout}>
                <IconLogout className={classes.icon} /> Déconnexion
              </MenuItem>
            </Menu>
          </Fragment>
        )}
      </Toolbar>
      {loading && <LinearProgress className={classes.progress} />}
    </AppBar>
  )
}
