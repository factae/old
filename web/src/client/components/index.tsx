import React, {Fragment} from 'react'
import IconAdd from '@material-ui/icons/Add'

import useRouting from '../../hooks/routing'
import Header from '../../components/Dashboard/Form/Header'
import ClientList from './List'

export default function() {
  const {goTo} = useRouting()

  return (
    <Fragment>
      <Header
        title="Clients"
        label="Ajouter"
        onClick={goTo('clientEdit')}
        icon={IconAdd}
      />

      <ClientList />
    </Fragment>
  )
}
