import React, {useContext, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'

import * as userService from '../../services/user'
import * as clientService from '../../services/client'
import AsyncContext from '../../contexts/async'
import ProfileContext, {useProfileReducer} from '../../contexts/profile'
import ClientContext, {useClientReducer} from '../../contexts/client'
import DashboardRoutes from './Routes'

import {useStyles} from './styles'

export default function() {
  const async = useContext(AsyncContext)
  const $profile = useProfileReducer()
  const $client = useClientReducer()
  const classes = useStyles()

  async function fetchProfile() {
    const profile = await userService.read()
    $profile.dispatch({type: 'update', profile})
  }

  async function fetchClients() {
    const clients = await clientService.readAll()
    $client.dispatch({type: 'update-all', clients})
  }

  async function fetchData() {
    async.start()

    try {
      await fetchProfile()
      await fetchClients()
    } catch (error) {
      console.error(error.message)
      return async.stop('Erreur lors de la récupération des données serveur !')
    }

    async.stop()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Grid container justify="center" className={classes.container}>
      <Grid item xs={12} md={10} lg={9} xl={8}>
        <ProfileContext.Provider value={$profile}>
          <ClientContext.Provider value={$client}>
            <DashboardRoutes />
          </ClientContext.Provider>
        </ProfileContext.Provider>
      </Grid>
    </Grid>
  )
}
