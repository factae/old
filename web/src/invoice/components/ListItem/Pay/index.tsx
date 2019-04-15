import React, {MouseEvent} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import IconPaid from '@material-ui/icons/EuroSymbol'

import useAsyncContext from '../../../../async/context'
import useDocumentContext from '../../../../document/context'
import * as $document from '../../../../document/service'
import {Invoice} from '../../../model'

import {useStyles} from './styles'

type Props = {
  invoice: Invoice
}

export default function({invoice}: Props) {
  const async = useAsyncContext()
  const {dispatch} = useDocumentContext()
  const classes = useStyles()

  async function pay(event: MouseEvent) {
    event.stopPropagation()

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

  return (
    <Tooltip placement="bottom" title="Facture payée">
      <span className={classes.icon}>
        <IconButton onClick={pay}>
          <IconPaid />
        </IconButton>
      </span>
    </Tooltip>
  )
}
