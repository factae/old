import React, {Fragment} from 'react'
import IconAdd from '@material-ui/icons/Add'

import useRouting from '../../../hooks/routing'
import Header from '../Form/Header'
import ClientList from './List'

export default function() {
  const {goTo} = useRouting()

  return (
    <Fragment>
      <Header
        title="Clients"
        tooltip="Ajouter un client"
        onClick={goTo('clientEdit')}
        icon={IconAdd}
      />

      <ClientList />
    </Fragment>
  )
}
