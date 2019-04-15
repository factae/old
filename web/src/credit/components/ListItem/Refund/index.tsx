import React, {MouseEvent} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import IconRefund from '@material-ui/icons/EuroSymbol'

import useAsyncContext from '../../../../async/context'
import useDocumentContext from '../../../../document/context'
import * as $document from '../../../../document/service'
import {Credit} from '../../../model'

import {useStyles} from './styles'

type Props = {
  credit: Credit
}

export default function({credit}: Props) {
  const async = useAsyncContext()
  const {dispatch} = useDocumentContext()
  const classes = useStyles()

  async function refund(event: MouseEvent) {
    event.stopPropagation()

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

  return (
    <Tooltip placement="bottom" title="Avoir payé">
      <span className={classes.icon}>
        <IconButton onClick={refund}>
          <IconRefund />
        </IconButton>
      </span>
    </Tooltip>
  )
}
