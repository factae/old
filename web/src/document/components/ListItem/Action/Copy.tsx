import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'

import useRouting from '../../../../common/hooks/routing'
import {Document} from '../../../model'

type Props = {
  document: Document
}

export default function(props: Props) {
  const {document} = props
  const {goTo} = useRouting()

  function copy() {
    goTo('documentEdit', {
      ...document,
      id: -1,
      number: '-',
      status: 'draft',
      items: document.items.map(item => ({
        ...item,
        id: -1,
        document: null,
      })),
    })
  }

  return <MenuItem onClick={copy}>Copier</MenuItem>
}
