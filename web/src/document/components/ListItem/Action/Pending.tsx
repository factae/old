import React, {Fragment} from 'react'

import {isQuotation} from '../../../../quotation/model'
import ActionSign from '../../../../quotation/components/ListItem/Sign'
import {isInvoice} from '../../../../invoice/model'
import ActionPay from '../../../../invoice/components/ListItem/Pay'
import {isCredit} from '../../../../credit/model'
import ActionRefund from '../../../../credit/components/ListItem/Refund'
import {Document} from '../../../model'
import ActionDownload from './Download'

type Props = {
  document: Document
  onClick: () => void
}

export default function({document, onClick}: Props) {
  return (
    <Fragment>
      {isQuotation(document) && (
        <ActionSign quotation={document} onClick={onClick} />
      )}

      {isInvoice(document) && (
        <ActionPay invoice={document} onClick={onClick} />
      )}

      {isCredit(document) && (
        <ActionRefund credit={document} onClick={onClick} />
      )}

      <ActionDownload document={document} onClick={onClick} />
    </Fragment>
  )
}
