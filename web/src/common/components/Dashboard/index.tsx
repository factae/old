import React from 'react'
import Grid from '@material-ui/core/Grid'

import ClientProvider from '../../../client/provider'
import QuotationProvider from '../../../quotation/provider'
import InvoiceProvider from '../../../invoice/provider'
import DashboardRoutes from './Routes'

import {useStyles} from './styles'

export default function() {
  const classes = useStyles()

  return (
    <Grid container justify="center" className={classes.container}>
      <Grid item xs={12} md={10} lg={9} xl={8}>
        <ClientProvider>
          <QuotationProvider>
            <InvoiceProvider>
              <DashboardRoutes />
            </InvoiceProvider>
          </QuotationProvider>
        </ClientProvider>
      </Grid>
    </Grid>
  )
}
