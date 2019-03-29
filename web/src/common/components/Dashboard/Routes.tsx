import React, {Fragment} from 'react'
import {Route} from 'react-router-dom'

import Dashboard from './Dashboard'
import Quotation from '../../../quotation/components'
import QuotationEdit from '../../../quotation/components/Edit'
import Invoice from '../../../invoice/components'
import InvoiceEdit from '../../../invoice/components/Edit'
import Client from '../../../client/components'
import ClientEdit from '../../../client/components/Edit'
import UserEdit from '../../../user/components'

export default function() {
  return (
    <Fragment>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/dashboard/quotation" component={Quotation} />
      <Route path="/dashboard/quotation/edit/:id?" component={QuotationEdit} />
      <Route exact path="/dashboard/invoice" component={Invoice} />
      <Route path="/dashboard/invoice/edit/:id?" component={InvoiceEdit} />
      <Route exact path="/dashboard/invoice" component={() => null} />
      <Route exact path="/dashboard/client" component={Client} />
      <Route path="/dashboard/client/edit/:id?" component={ClientEdit} />
      <Route path="/dashboard/profile" component={UserEdit} />
    </Fragment>
  )
}
