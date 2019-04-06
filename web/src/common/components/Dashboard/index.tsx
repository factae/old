import React, {useContext, useEffect} from 'react'
import isNull from 'lodash/isNull'
import Grid from '@material-ui/core/Grid'

import * as userService from '../../../user/service'
import * as clientService from '../../../client/service'
import * as quotationService from '../../../quotation/service'
import * as invoiceService from '../../../invoice/service'
import AsyncContext from '../../../common/contexts/async'
import useRouting from '../../../common/hooks/routing'
import UserContext, {useUserReducer} from '../../../user/context'
import ClientContext, {useClientReducer} from '../../../client/context'
import QuotationContext, {useQuotationReducer} from '../../../quotation/context'
import InvoiceContext, {useInvoiceReducer} from '../../../invoice/context'
import DashboardRoutes from './Routes'

import {useStyles} from './styles'

export default function() {
  const async = useContext(AsyncContext)
  const router = useRouting()
  const [userState, userDispatch] = useUserReducer()
  const [clientState, clientDispatch] = useClientReducer()
  const [quotationState, quotationDispatch] = useQuotationReducer()
  const [invoiceState, invoiceDispatch] = useInvoiceReducer()
  const isProfileRoute = router.location.pathname === '/dashboard/profile'
  const classes = useStyles()

  async function fetchUser() {
    const user = await userService.read()
    userDispatch({type: 'update', user})
  }

  async function fetchClients() {
    const clients = await clientService.readAll()
    clientDispatch({type: 'update-all', clients})
  }

  async function fetchQuotations() {
    const quotations = await quotationService.readAll()
    quotationDispatch({type: 'update-all', quotations})
  }

  async function fetchInvoices() {
    const invoices = await invoiceService.readAll()
    invoiceDispatch({type: 'update-all', invoices})
  }

  async function fetchData() {
    async.start()

    try {
      await fetchUser()
      await fetchClients()
      await fetchQuotations()
      await fetchInvoices()
    } catch (error) {
      console.error(error.toString())
      return async.stop('Erreur : serveur !')
    }

    async.stop()
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (isNull(userState)) return
    if (isNull(userState.siren) && !isProfileRoute) {
      if (!isProfileRoute) router.goTo('profile')
      async.stop('Vous devez remplir votre profil avant de pouvoir continuer.')
    }
  }, [userState, router.location.pathname])

  if (async.loading) {
    return null
  }

  return (
    <Grid container justify="center" className={classes.container}>
      <Grid item xs={12} md={10} lg={9} xl={8}>
        <UserContext.Provider value={[userState, userDispatch]}>
          <ClientContext.Provider value={[clientState, clientDispatch]}>
            <QuotationContext.Provider
              value={[quotationState, quotationDispatch]}
            >
              <InvoiceContext.Provider value={[invoiceState, invoiceDispatch]}>
                <DashboardRoutes />
              </InvoiceContext.Provider>
            </QuotationContext.Provider>
          </ClientContext.Provider>
        </UserContext.Provider>
      </Grid>
    </Grid>
  )
}
