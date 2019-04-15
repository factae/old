import React, {Fragment, useMemo, useState} from 'react'
import _ from 'lodash/fp'

import {isQuotation} from '../../quotation/model'
import {isInvoice} from '../../invoice/model'
import {isCredit} from '../../credit/model'
import useRouting from '../../common/hooks/routing'
import {DocumentType} from '../model'
import useDocumentContext from '../context'

import QuotationEdit from '../../quotation/components/Edit'
import InvoiceEdit from '../../invoice/components/Edit'
import CreditEdit from '../../credit/components/Edit'
import Tabs from './Tabs'

export default function() {
  const {documents} = useDocumentContext()
  const {goTo, match, location} = useRouting<{id: number}>()
  const id = _.isNil(match.params.id) ? -1 : Number(match.params.id)

  const document = useMemo(() => {
    const {state} = location
    if (_.has('id', state)) return state

    const document = _.find({id}, documents)
    if (!_.isNil(document)) return document

    return null
  }, [documents])

  const stateType = _.getOr(null, 'state.type', location)
  const [type, setType] = useState<DocumentType>(
    _.isNull(document) ? stateType || 'quotation' : document.type,
  )

  const labels =
    id === -1
      ? {
          quotation: 'Créer un devis',
          invoice: 'Créer une facture',
          credit: 'Créer un avoir',
        }
      : {
          quotation: 'Modifier un devis',
          invoice: 'Modifier une facture',
          credit: 'Modifier un avoir',
        }

  function goToDashboard() {
    goTo('dashboard')
  }

  function goToDocument() {
    goTo('document', {type})
  }

  function renderForm() {
    if (_.isNil(document)) {
      switch (type) {
        default:
        case 'quotation':
          return <QuotationEdit />
        case 'invoice':
          return <InvoiceEdit />
        case 'credit':
          return <CreditEdit />
      }
    }

    if (isQuotation(document)) return <QuotationEdit quotation={document} />
    if (isInvoice(document)) return <InvoiceEdit invoice={document} />
    if (isCredit(document)) return <CreditEdit credit={document} />
  }

  return (
    <Fragment>
      <Tabs
        value={type}
        onChange={setType}
        labels={labels}
        onBack={
          _.isNull(document) && _.isNull(stateType)
            ? goToDashboard
            : goToDocument
        }
        disabled={id > -1 || !_.isNull(document)}
      />

      {renderForm()}
    </Fragment>
  )
}
