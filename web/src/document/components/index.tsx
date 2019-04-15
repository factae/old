import React, {Fragment, useState} from 'react'
import IconAdd from '@material-ui/icons/Add'
import _ from 'lodash/fp'

import useRouting from '../../common/hooks/routing'
import {DocumentType} from '../model'
import DocumentList from './List'
import Tabs from './Tabs'

export default function() {
  const {goTo, location} = useRouting()
  const defaultType = _.getOr('quotation', 'state.type', location)
  const [type, setType] = useState<DocumentType>(defaultType)
  const goToDashboard = () => goTo('dashboard')
  const goToDocumentEdit = () => goTo('documentEdit', {type})
  const action = {label: 'Nouveau', icon: IconAdd, onClick: goToDocumentEdit}

  return (
    <Fragment>
      <Tabs
        value={type}
        onChange={setType}
        onBack={goToDashboard}
        action={action}
      />

      <DocumentList type={type} />
    </Fragment>
  )
}
