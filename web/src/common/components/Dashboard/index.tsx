import React, {useEffect} from 'react'
import isNull from 'lodash/isNull'
import Grid from '@material-ui/core/Grid'

import * as clientService from '../../../client/service'
import * as quotationService from '../../../quotation/service'
import * as invoiceService from '../../../invoice/service'
import useAsyncContext from '../../../async/context'
import useRouting from '../../../common/hooks/routing'
import ClientContext, {useClientReducer} from '../../../client/context'
import QuotationContext, {useQuotationReducer} from '../../../quotation/context'
import InvoiceContext, {useInvoiceReducer} from '../../../invoice/context'
import DashboardRoutes from './Routes'
import useUserContext from '../../../user/context'
import UserProvider from '../../../user/provider'

import {useStyles} from './styles'

export default function() {
  const async = useAsyncContext()
  const router = useRouting()
  const [user] = useUserContext()
  const [clientState, clientDispatch] = useClientReducer()
  const [quotationState, quotationDispatch] = useQuotationReducer()
  const [invoiceState, invoiceDispatch] = useInvoiceReducer()
  const isProfileRoute = router.location.pathname === '/dashboard/profile'
  const classes = useStyles()

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
    try {
      await fetchClients()
      await fetchQuotations()
      await fetchInvoices()
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

  if (async.loading && isNull(user)) {
    return null
  }

  return (
    <Grid container justify="center" className={classes.container}>
      <Grid item xs={12} md={10} lg={9} xl={8}>
        <UserProvider>
          <ClientContext.Provider value={[clientState, clientDispatch]}>
            <QuotationContext.Provider
              value={[quotationState, quotationDispatch]}
            >
              <InvoiceContext.Provider value={[invoiceState, invoiceDispatch]}>
                <DashboardRoutes />
              </InvoiceContext.Provider>
            </QuotationContext.Provider>
          </ClientContext.Provider>
        </UserProvider>
      </Grid>
    </Grid>
  )
}
