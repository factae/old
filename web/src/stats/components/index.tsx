import React, {Fragment} from 'react'

import useRouting from '../../common/hooks/routing'
import Header from '../../common/form/Header'
import Chart from '../../common/components/Dashboard/Chart'
import Help from '../../common/components/Dashboard/Help'

export default function() {
  const {goTo} = useRouting()

  return (
    <Fragment>
      <Header
        title="Chiffre d'affaire en temps réel"
        onBack={() => goTo('dashboard')}
      />

      <main>
        <Chart />
        <Help />
      </main>
    </Fragment>
  )
}
