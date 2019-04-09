import React, {Fragment, useEffect} from 'react'
import isNull from 'lodash/isNull'
import every from 'lodash/every'
import {Route} from 'react-router-dom'

import Dashboard from './Dashboard'
import Quotation from '../../../quotation/components'
import QuotationEdit from '../../../quotation/components/Edit'
import Invoice from '../../../invoice/components'
import InvoiceEdit from '../../../invoice/components/Edit'
import Client from '../../../client/components'
import ClientEdit from '../../../client/components/Edit'
import UserEdit from '../../../user/components'
import useAsyncContext from '../../../async/context'
import useUserContext from '../../../user/context'
import useClientContext from '../../../client/context'
import useQuotationContext from '../../../quotation/context'
import useInvoiceContext from '../../../invoice/context'

export default function() {
  const async = useAsyncContext()
  const [user] = useUserContext()
  const [clients] = useClientContext()
  const [quotations] = useQuotationContext()
  const [invoices] = useInvoiceContext()
  const resourcesReady = every([user, clients, quotations, invoices], isReady)

  function isReady(resource: any) {
    return !isNull(resource)
  }

  useEffect(() => {
    if (resourcesReady) {
      async.stop()
    }
  }, [resourcesReady])

  return (
    <Fragment>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/dashboard/quotation" component={Quotation} />
      <Route path="/dashboard/quotation/edit/:id?" component={QuotationEdit} />
      <Route exact path="/dashboard/invoice" component={Invoice} />
      <Route path="/dashboard/invoice/edit/:id?" component={InvoiceEdit} />
      <Route exact path="/dashboard/client" component={Client} />
      <Route path="/dashboard/client/edit/:id?" component={ClientEdit} />
      <Route path="/dashboard/profile" component={UserEdit} />
    </Fragment>
  )
}
