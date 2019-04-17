import React, {Fragment} from 'react'
import Grid from '@material-ui/core/Grid'
import {MuiPickersUtilsProvider} from 'material-ui-pickers'
import LuxonUtils from '@date-io/luxon'

import UserProvider from '../../../user/provider'
import ClientProvider from '../../../client/provider'
import DocumentProvider from '../../../document/provider'
import DashboardRoutes from './Routes'

import {useStyles} from './styles'

export default function() {
  const classes = useStyles()

  return (
    <Fragment>
      <Grid container justify="center" className={classes.container}>
        <Grid item xs={12} md={10} lg={9} xl={8}>
          <ClientProvider>
            <DocumentProvider>
              <MuiPickersUtilsProvider locale="fr" utils={LuxonUtils}>
                <UserProvider>
                    <DashboardRoutes />
                </UserProvider>
              </MuiPickersUtilsProvider>
            </DocumentProvider>
          </ClientProvider>
        </Grid>
      </Grid>
    </Fragment>
  )
}
