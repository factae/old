import React, {Fragment, MouseEvent} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import IconSave from '@material-ui/icons/Save'
import IconSaveAndSend from '@material-ui/icons/Send'

import useAsyncContext from '../../../../../async/context'
import {Invoice} from '../../../../../invoice/model'
import useInvoiceContext from '../../../../../invoice/context'
import * as $invoice from '../../../../../invoice/service'
import {useUserSetting} from '../../../../../user/hooks'

import {useStyles} from './styles'

type Props = {
  invoice: Invoice
}

export default function({invoice}: Props) {
  const classes = useStyles()
  const userHasAutoSend = useUserSetting('invoiceAutoSend')
  const async = useAsyncContext()
  const {dispatch, download} = useInvoiceContext()
  const title = userHasAutoSend ? 'Sauvegarder & Envoyer' : 'Sauvegarder'

  async function save(event: MouseEvent) {
    event.stopPropagation()

    try {
      async.start()
      invoice.status = 'pending'
      await $invoice.update(invoice)
      invoice.pdf = await download(invoice)
      dispatch({type: 'update', invoice})
      await $invoice.update(invoice)
      async.stop()
    } catch (error) {
      console.error(error.toString())
      async.stop('Erreur : échec de la sauvegarde')
    }
  }

  return (
    <Fragment>
      <Tooltip placement="bottom" title={title}>
        <span className={classes.icon}>
          <IconButton onClick={save}>
            {userHasAutoSend ? <IconSaveAndSend /> : <IconSave />}
          </IconButton>
        </span>
      </Tooltip>
    </Fragment>
  )
}
