import React, {MouseEvent} from 'react'
import MenuItem from '@material-ui/core/MenuItem'

import useAsyncContext from '../../../async/context'
import useDocumentContext from '../../../document/context'
import * as $document from '../../../document/service'
import {Quotation} from '../../model'

type Props = {
  quotation: Quotation
  onClick: () => void
}

export default function({quotation, onClick: closeMenu}: Props) {
  const async = useAsyncContext()
  const {dispatch} = useDocumentContext()

  async function sign(event: MouseEvent) {
    event.stopPropagation()
    closeMenu()

    try {
      async.start()
      quotation.status = 'signed'
      await $document.update(quotation)
      dispatch({type: 'update', document: quotation})
      async.stop()
    } catch (error) {
      console.error(error.toString())
      async.stop('Erreur : échec de la signature')
    }
  }

  return <MenuItem onClick={sign}>Devis signé</MenuItem>
}
