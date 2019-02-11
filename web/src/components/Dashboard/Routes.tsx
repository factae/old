import React, {Fragment} from 'react'
import {Route} from 'react-router-dom'

import Home from './Home'
import Quotation from './Quotation'
import QuotationEdit from './Quotation/Edit'
import Invoice from './Invoice'
import Client from './Client'
import ClientEdit from './Client/Edit'
import Profile from './Profile'

export default function() {
  return (
    <Fragment>
      <Route exact path="/dashboard" component={Home} />
      <Route exact path="/dashboard/quotation" component={Quotation} />
      <Route exact path="/dashboard/quotation/edit" component={QuotationEdit} />
      <Route exact path="/dashboard/invoice" component={Invoice} />
      <Route exact path="/dashboard/client" component={Client} />
      <Route exact path="/dashboard/client/edit/:id?" component={ClientEdit} />
      <Route exact path="/dashboard/profile" component={Profile} />
    </Fragment>
  )
}
