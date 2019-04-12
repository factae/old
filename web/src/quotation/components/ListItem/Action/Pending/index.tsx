import React, {Fragment, MouseEvent} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import IconSign from '@material-ui/icons/Check'
import IconDownload from '@material-ui/icons/SaveAlt'

import useAsyncContext from '../../../../../async/context'
import {Quotation} from '../../../../../quotation/model'
import useQuotationContext from '../../../../../quotation/context'
import * as $quotation from '../../../../../quotation/service'

import {useStyles} from './styles'

type Props = {
  quotation: Quotation
}

export default function({quotation}: Props) {
  const async = useAsyncContext()
  const {dispatch} = useQuotationContext()
  const classes = useStyles()

  function stopPropagation(event: MouseEvent) {
    event.stopPropagation()
  }

  async function sign(event: MouseEvent) {
    event.stopPropagation()

    try {
      async.start()
      quotation.status = 'signed'
      await $quotation.update(quotation)
      dispatch({type: 'update', quotation})
      async.stop()
    } catch (error) {
      console.error(error.toString())
      async.stop('Erreur : échec de la signature')
    }
  }

  return (
    <Fragment>
      <Tooltip placement="bottom" title="Devis signé">
        <span className={classes.icon}>
          <IconButton onClick={sign}>
            <IconSign />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip placement="bottom" title="Télécharger">
        <span className={classes.icon}>
          <IconButton
            href={String(quotation.pdf)}
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
