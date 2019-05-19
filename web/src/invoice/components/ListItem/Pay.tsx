import React, {MouseEvent} from 'react'
import MenuItem from '@material-ui/core/MenuItem'

import useAsyncContext from '../../../async/context'
import useDocumentContext from '../../../document/context'
import * as $document from '../../../document/service'
import {Invoice} from '../../model'

type Props = {
  invoice: Invoice
  onClick: () => void
}

export default function({invoice, onClick: closeMenu}: Props) {
  const async = useAsyncContext()
  const {dispatch} = useDocumentContext()

  async function pay(event: MouseEvent) {
    event.stopPropagation()
    closeMenu()

    try {
      async.start()
      invoice.status = 'paid'
      await $document.update(invoice)
      dispatch({type: 'update', document: invoice})
      async.stop()
    } catch (error) {
      console.error(error.toString())
      async.stop('Erreur : échec du paiement')
    }
  }

  return <MenuItem onClick={pay}>Facture payée</MenuItem>
}
