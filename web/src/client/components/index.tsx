import React, {Fragment} from 'react'
import IconAdd from '@material-ui/icons/Add'

import useRouting from '../../common/hooks/routing'
import Header from '../../common/form/Header'
import ClientList from './List'

export default function() {
  const {goTo} = useRouting()

  return (
    <Fragment>
      <Header
        title="Clients"
        onBack={() => goTo('dashboard')}
        action={{
          label: 'Ajouter',
          icon: IconAdd,
          onClick: () => goTo('clientEdit'),
        }}
      />

      <ClientList />
    </Fragment>
  )
}
