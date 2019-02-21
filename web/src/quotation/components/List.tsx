import React, {Fragment, MouseEvent, useContext, useState} from 'react'
import isNull from 'lodash/fp/isNull'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import AsyncContext from '../../common/contexts/async'
import {Quotation} from '../model'
import * as service from '../service'
import QuotationContext from '../context'
import QuotationListItem from './ListItem'
import Confirm from './Confirm'

export default function() {
  const async = useContext(AsyncContext)
  const [quotations, dispatch] = useContext(QuotationContext)
  const [open, setOpen] = useState(false)
  const [quotation, setQuotation] = useState<Quotation | null>(null)

  if (isNull(quotations)) {
    return null
  }

  function closeConfirm() {
    setOpen(false)
  }

  function confirmDownload(index: number) {
    return (event: MouseEvent) => {
      event.stopPropagation()
      setOpen(true)
      setQuotation(quotations![index])
    }
  }

  async function download() {
    if (!quotation) return
    async.start()

    try {
      quotation.status = 'sent'

      closeConfirm()
      dispatch({type: 'update', quotation})
      setQuotation(null)
      await service.update(quotation)

      // TODO: generate and download quotation
      async.stop()
    } catch (error) {
      console.error(error)
      async.stop('Erreur lors du téléchargement du devis !')
    }
  }

  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Numéro</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell align="right">Total TTC</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quotations.map((quotation, index) => (
            <QuotationListItem
              key={quotation.id}
              quotation={quotation}
              onConfirmDownload={confirmDownload(index)}
            />
          ))}
        </TableBody>
      </Table>

      <Confirm open={open} onCancel={closeConfirm} onConfirm={download} />
    </Fragment>
  )
}
