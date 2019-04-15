import React, {MouseEvent} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import IconSign from '@material-ui/icons/Check'

import useAsyncContext from '../../../../async/context'
import useDocumentContext from '../../../../document/context'
import * as $document from '../../../../document/service'
import {Quotation} from '../../../model'

import {useStyles} from './styles'

type Props = {
  quotation: Quotation
}

export default function({quotation}: Props) {
  const async = useAsyncContext()
  const {dispatch} = useDocumentContext()
  const classes = useStyles()

  async function sign(event: MouseEvent) {
    event.stopPropagation()

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

  return (
    <Tooltip placement="bottom" title="Devis signé">
      <span className={classes.icon}>
        <IconButton onClick={sign}>
          <IconSign />
        </IconButton>
      </span>
    </Tooltip>
  )
}
