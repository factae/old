import React, {Fragment, MouseEvent} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import IconPaid from '@material-ui/icons/EuroSymbol'
import IconDownload from '@material-ui/icons/SaveAlt'

import useAsyncContext from '../../../../../async/context'
import {Invoice} from '../../../../../invoice/model'
import useInvoiceContext from '../../../../../invoice/context'
import * as $invoice from '../../../../../invoice/service'

import {useStyles} from './styles'

type Props = {
  invoice: Invoice
}

export default function({invoice}: Props) {
  const async = useAsyncContext()
  const {dispatch} = useInvoiceContext()
  const classes = useStyles()

  function stopPropagation(event: MouseEvent) {
    event.stopPropagation()
  }

  async function paid(event: MouseEvent) {
    event.stopPropagation()

    try {
      async.start()
      invoice.status = 'paid'
      await $invoice.update(invoice)
      dispatch({type: 'update', invoice})
      async.stop()
    } catch (error) {
      console.error(error.toString())
      async.stop('Erreur : échec de la signature')
    }
  }

  return (
    <Fragment>
      <Tooltip placement="bottom" title="Facture payée">
        <span className={classes.icon}>
          <IconButton onClick={paid}>
            <IconPaid />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip placement="bottom" title="Télécharger">
        <span className={classes.icon}>
          <IconButton
            href={String(invoice.pdf)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stopPropagation}
          >
            <IconDownload />
          </IconButton>
        </span>
      </Tooltip>
    </Fragment>
  )
}
