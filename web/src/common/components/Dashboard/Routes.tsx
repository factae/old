import React, {Fragment} from 'react'
import {Route} from 'react-router-dom'

import Dashboard from './Dashboard'
import Quotation from '../../../quotation/components'
import QuotationEdit from '../../../quotation/components/Edit'
import Client from '../../../client/components'
import ClientEdit from '../../../client/components/Edit'
import Profile from '../../../user/components'

export default function() {
  return (
    <Fragment>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/dashboard/quotation" component={Quotation} />
      <Route
        exact
        path="/dashboard/quotation/edit/:id?"
        component={QuotationEdit}
      />
      <Route exact path="/dashboard/invoice" component={() => null} />
      <Route exact path="/dashboard/client" component={Client} />
      <Route exact path="/dashboard/client/edit/:id?" component={ClientEdit} />
      <Route exact path="/dashboard/profile" component={Profile} />
    </Fragment>
  )
}
