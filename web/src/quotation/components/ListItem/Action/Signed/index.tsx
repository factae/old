import React, {Fragment} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import IconDownload from '@material-ui/icons/SaveAlt'
import IconTransform from '@material-ui/icons/Redo'

import useAsyncContext from '../../../../../async/context'
import usePaymentContext from '../../../../../payment/context'
import {usePremium} from '../../../../../user/hooks'
import useRouting from '../../../../../common/hooks/routing'
import {Quotation} from '../../../../model'

import {useStyles} from './styles'

interface Props {
  quotation: Quotation
}

export default function(props: Props) {
  const {quotation} = props
  const {goTo} = useRouting()
  const {loading} = useAsyncContext()
  const {openPaymentDialog} = usePaymentContext()
  const classes = useStyles()
  const userHasPremium = usePremium()

  function transformToInvoice() {
    if (userHasPremium) {
      goTo('invoiceEdit', {
        ...quotation,
        id: null,
        status: 'draft',
        items: quotation.items.map(item => ({
          ...item,
          id: null,
          contract: null,
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
          <IconButton disabled={loading} onClick={transformToInvoice}>
            <IconTransform />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip placement="bottom" title="Télécharger">
        <span className={classes.icon}>
          <IconButton
            href={quotation.pdf || '#'}
            target="_blank"
            rel="noopener noreferrer"
            disabled={loading}
          >
            <IconDownload />
          </IconButton>
        </span>
      </Tooltip>
    </Fragment>
  )
}
