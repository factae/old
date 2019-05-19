import React, {MouseEvent} from 'react'
import MenuItem from '@material-ui/core/MenuItem'

import useAsyncContext from '../../../async/context'
import useDocumentContext from '../../../document/context'
import * as $document from '../../../document/service'
import {Credit} from '../../model'

type Props = {
  credit: Credit
  onClick: () => void
}

export default function({credit, onClick: closeMenu}: Props) {
  const async = useAsyncContext()
  const {dispatch} = useDocumentContext()

  async function refund(event: MouseEvent) {
    event.stopPropagation()
    closeMenu()

    try {
      async.start()
      credit.status = 'paid'
      await $document.update(credit)
      dispatch({type: 'update', document: credit})
      async.stop()
    } catch (error) {
      console.error(error.toString())
      async.stop('Erreur : échec du remboursement')
    }
  }

  return <MenuItem onClick={refund}>Avoir payé</MenuItem>
}
