import React, {useEffect} from 'react'
import isNull from 'lodash/isNull'
import Grid from '@material-ui/core/Grid'

import * as clientService from '../../../client/service'
import useAsyncContext from '../../../async/context'
import useRouting from '../../../common/hooks/routing'
import ClientContext, {useClientReducer} from '../../../client/context'
import QuotationProvider from '../../../quotation/provider'
import InvoiceProvider from '../../../invoice/provider'
import DashboardRoutes from './Routes'
import useUserContext from '../../../user/context'

import {useStyles} from './styles'

export default function() {
  const async = useAsyncContext()
  const router = useRouting()
  const [user] = useUserContext()
  const [clientState, clientDispatch] = useClientReducer()
  const isProfileRoute = router.location.pathname === '/dashboard/profile'
  const classes = useStyles()

  async function fetchClients() {
    const clients = await clientService.readAll()
    clientDispatch({type: 'update-all', clients})
  }

  async function fetchData() {
    try {
      await fetchClients()
      async.stop()
    } catch (error) {
      console.error(error.toString())
      return async.stop('Erreur : serveur !')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (isNull(user)) return
    if (isNull(user.siren) && !isProfileRoute) {
      if (!isProfileRoute) router.goTo('profile')
      async.stop('Vous devez remplir votre profil avant de pouvoir continuer.')
    }
  }, [user, router.location.pathname])

  return (
    <Grid container justify="center" className={classes.container}>
      <Grid item xs={12} md={10} lg={9} xl={8}>
        <ClientContext.Provider value={[clientState, clientDispatch]}>
          <QuotationProvider>
            <InvoiceProvider>
              <DashboardRoutes />
            </InvoiceProvider>
          </QuotationProvider>
        </ClientContext.Provider>
      </Grid>
    </Grid>
  )
}
