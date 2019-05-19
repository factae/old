import React, {Fragment} from 'react'
import MenuItem from '@material-ui/core/MenuItem'

import useRouting from '../../../../common/hooks/routing'
import {Document} from '../../../model'
import ActionCopy from './Copy'
import ActionDownload from './Download'

type Props = {
  document: Document
  onClick: () => void
}

export default function({document, onClick}: Props) {
  const {goTo} = useRouting()

  function transformToInvoice() {
    goTo('documentEdit', {
      ...document,
      id: -1,
      number: '-',
      type: 'invoice',
      status: 'draft',
      items: document.items.map(item => ({
        ...item,
        id: -1,
        document: null,
      })),
    })
  }

  return (
    <Fragment>
      <MenuItem onClick={transformToInvoice}>Transformer en facture</MenuItem>
      <ActionCopy document={document} />
      <ActionDownload document={document} onClick={onClick} />
    </Fragment>
  )
}
