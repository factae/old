import React, {Fragment} from 'react'
import IconAdd from '@material-ui/icons/Add'

import useRouting from '../../../hooks/routing'
import Header from '../Form/Header'
import QuotationList from './List'

export default function() {
  const {goTo} = useRouting()

  return (
    <Fragment>
      <Header
        title="Devis"
        tooltip="Créer un devis"
        icon={IconAdd}
        onClick={goTo('quotationEdit')}
      />

      <QuotationList />
    </Fragment>
  )
}
