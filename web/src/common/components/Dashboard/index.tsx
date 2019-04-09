import React, {useEffect} from 'react'
import isNull from 'lodash/isNull'
import Grid from '@material-ui/core/Grid'

import useAsyncContext from '../../../async/context'
import useRouting from '../../../common/hooks/routing'
import ClientProvider from '../../../client/provider'
import QuotationProvider from '../../../quotation/provider'
import InvoiceProvider from '../../../invoice/provider'
import useUserContext from '../../../user/context'
import DashboardRoutes from './Routes'

import {useStyles} from './styles'

export default function() {
  const async = useAsyncContext()
  const router = useRouting()
  const [user] = useUserContext()
  const isProfileRoute = router.location.pathname === '/dashboard/profile'
  const classes = useStyles()

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
