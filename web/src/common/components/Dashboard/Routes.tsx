import React, {Fragment, useEffect} from 'react'
import every from 'lodash/every'
import {Route} from 'react-router-dom'
import {DateTime} from 'luxon'
import isNull from 'lodash/isNull'

import Payment from '../../../payment/components'
import Document from '../../../document/components'
import DocumentEdit from '../../../document/components/Edit'
import Client from '../../../client/components'
import ClientEdit from '../../../client/components/Edit'
import UserEdit from '../../../user/components'
import Stats from '../../../stats/components'
import Settings from '../../../settings/components'
import useAsyncContext from '../../../async/context'
import useUserContext from '../../../user/context'
import useClientContext from '../../../client/context'
import useDocumentContext from '../../../document/context'
import Dashboard from './Dashboard'
import Stepper from './Stepper'

export default function() {
  const async = useAsyncContext()
  const [user] = useUserContext()
  const [clients] = useClientContext()
  const {documents} = useDocumentContext()
  const resourcesReady = every([user, clients, documents], isReady)

  function isReady(resource: any) {
    return !isNull(resource)
  }

  useEffect(() => {
    if (resourcesReady) {
      async.stop()
    }
  }, [resourcesReady])

  if (!user) return null
  if (!user.ready) return <Stepper />
  if (!user.expiresAt || DateTime.fromISO(user.expiresAt) < DateTime.local()) {
    return <Payment />
  }

  return (
    <Fragment>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/dashboard/client" component={Client} />
      <Route path="/dashboard/client/edit/:id?" component={ClientEdit} />
      <Route exact path="/dashboard/profile" component={UserEdit} />
      <Route exact path="/dashboard/stats" component={Stats} />
      <Route exact path="/dashboard/settings" component={Settings} />
      <Route exact path="/dashboard/document" component={Document} />
      <Route path="/dashboard/document/edit/:id?" component={DocumentEdit} />
    </Fragment>
  )
}
