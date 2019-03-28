import React, {useContext, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'

import * as userService from '../../../user/service'
import * as clientService from '../../../client/service'
import * as quotationService from '../../../quotation/service'
import * as invoiceService from '../../../invoice/service'
import AsyncContext from '../../../common/contexts/async'
import ProfileContext, {useProfileReducer} from '../../../user/context'
import ClientContext, {useClientReducer} from '../../../client/context'
import QuotationContext, {useQuotationReducer} from '../../../quotation/context'
import InvoiceContext, {useInvoiceReducer} from '../../../invoice/context'
import DashboardRoutes from './Routes'

import {useStyles} from './styles'

export default function() {
  const async = useContext(AsyncContext)
  const [profileState, profileDispatch] = useProfileReducer()
  const [clientState, clientDispatch] = useClientReducer()
  const [quotationState, quotationDispatch] = useQuotationReducer()
  const [invoiceState, invoiceDispatch] = useInvoiceReducer()
  const classes = useStyles()

  async function fetchProfile() {
    const profile = await userService.read()
    profileDispatch({type: 'update', profile})
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
      await fetchProfile()
      await fetchClients()
      await fetchQuotations()
      await fetchInvoices()
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
        <ProfileContext.Provider value={[profileState, profileDispatch]}>
          <ClientContext.Provider value={[clientState, clientDispatch]}>
            <QuotationContext.Provider
              value={[quotationState, quotationDispatch]}
            >
              <InvoiceContext.Provider value={[invoiceState, invoiceDispatch]}>
                <DashboardRoutes />
              </InvoiceContext.Provider>
            </QuotationContext.Provider>
          </ClientContext.Provider>
        </ProfileContext.Provider>
      </Grid>
    </Grid>
  )
}
