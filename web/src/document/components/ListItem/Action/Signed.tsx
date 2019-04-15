import React, {Fragment} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import IconDownload from '@material-ui/icons/SaveAlt'
import IconTransform from '@material-ui/icons/Redo'

import usePaymentContext from '../../../../payment/context'
import {useUserPremium} from '../../../../user/hooks'
import useRouting from '../../../../common/hooks/routing'
import {Document} from '../../../model'
import ActionCopy from './Copy'

import {useStyles} from './styles'

type Props = {
  document: Document
}

export default function(props: Props) {
  const {document} = props
  const {goTo} = useRouting()
  const {openPaymentDialog} = usePaymentContext()
  const classes = useStyles()
  const userHasPremium = useUserPremium()

  function transformToInvoice() {
    if (userHasPremium) {
      goTo('documentEdit', {
        ...document,
        id: -1,
        number: '-',
        type: 'invoice',
        status: 'draft',
        items: document.items.map(item => ({
          ...item,
          id: -1,
          document: null,
        })),
      })
    } else {
      openPaymentDialog()
    }
  }

  return (
    <Fragment>
      <Tooltip placement="bottom" title="Transformer en facture">
        <span className={classes.icon}>
          <IconButton onClick={transformToInvoice}>
            <IconTransform />
          </IconButton>
        </span>
      </Tooltip>

      <ActionCopy document={document} />

      <Tooltip placement="bottom" title="Télécharger">
        <span className={classes.icon}>
          <IconButton
            href={String(document.pdf)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconDownload />
          </IconButton>
        </span>
      </Tooltip>
    </Fragment>
  )
}
