import React, {Fragment, MouseEvent, useContext, useState} from 'react'
import classNames from 'classnames'
import find from 'lodash/find'
import isNull from 'lodash/isNull'
import noop from 'lodash/noop'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import IconDownload from '@material-ui/icons/SaveAlt'
import IconPaid from '@material-ui/icons/AttachMoney'

import ClientContext from '../../client/context'
import AsyncContext from '../../common/contexts/async'
import useRouting from '../../common/hooks/routing'
import {toEuro} from '../../common/utils/currency'
import {Invoice} from '../model'
import QuotationContext from '../context'
import * as service from '../service'
import Confirm from './Confirm'
import Document from './Document'

import {useStyles} from './styles'

interface Props {
  invoice: Invoice
}

export default function(props: Props) {
  const {invoice} = props

  const async = useContext(AsyncContext)
  const [clients] = useContext(ClientContext)
  const dispatch = useContext(QuotationContext)[1]
  const [confirm, setConfirm] = useState(false)
  const [readyToDownload, setReadyToDownload] = useState(false)
  const {goTo} = useRouting()

  const client = find(clients, {id: invoice.clientId}) || null
  const clientName = `${client!.firstName} ${client!.lastName}`
  const isDraft = invoice.status === 'draft'

  const classes = useStyles()
  const classNameCell = classNames({[classes.nonDraft]: !isDraft})

  if (isNull(clients) || isNull(client)) {
    return null
  }

  function openConfirm(event: MouseEvent) {
    event.stopPropagation()
    setConfirm(true)
  }

  function closeConfirm() {
    setConfirm(false)
  }

  async function lockAndDownload() {
    try {
      async.start()
      closeConfirm()
      invoice.status = 'validated'
      await service.update(invoice)
      dispatch({type: 'update', invoice})
      async.stop()
      setReadyToDownload(true)
    } catch (error) {
      handleDownloadError(error)
    }
  }

  async function paid() {
    try {
      async.start()
      invoice.status = 'paid'
      dispatch({type: 'update', invoice})
      await service.update(invoice)
      async.stop()
    } catch (error) {
      console.error(error)
      async.stop('Erreur lors de la mise à jour de la facture !')
    }
  }

  async function handleDownloadSuccess(pdf: string) {
    setReadyToDownload(false)
    invoice.pdf = pdf
    dispatch({type: 'update', invoice})
    await service.update(invoice)
    async.stop()
  }

  function handleDownloadError(error: Error) {
    console.error(error)
    setReadyToDownload(false)
    async.stop('Erreur lors du téléchargement de la facture !')
  }

  function renderAction() {
    switch (invoice.status) {
      case 'draft':
        return (
          <Tooltip placement="bottom" title="Télécharger">
            <span className={classes.icon}>
              <IconButton onClick={openConfirm} disabled={async.loading}>
                <IconDownload />
              </IconButton>
            </span>
          </Tooltip>
        )

      case 'validated':
        return (
          <Fragment>
            <Tooltip placement="bottom" title="Facture payée">
              <span className={classes.icon}>
                <IconButton onClick={paid} disabled={async.loading}>
                  <IconPaid />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip placement="bottom" title="Télécharger">
              <span className={classes.icon}>
                <IconButton
                  href={invoice.pdf || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  disabled={async.loading}
                >
                  <IconDownload />
                </IconButton>
              </span>
            </Tooltip>
          </Fragment>
        )

      case 'paid':
        return (
          <Tooltip placement="bottom" title="Télécharger">
            <span className={classes.icon}>
              <IconButton
                href={invoice.pdf || '#'}
                target="_blank"
                rel="noopener noreferrer"
                disabled={async.loading}
              >
                <IconDownload />
              </IconButton>
            </span>
          </Tooltip>
        )

      default:
        return null
    }
  }

  return (
    <Fragment>
      <TableRow
        className={classNames({[classes.draft]: isDraft})}
        onClick={isDraft ? goTo('invoiceEdit', invoice.id) : noop}
      >
        <TableCell className={classNameCell}>{invoice.number}</TableCell>
        <TableCell className={classNameCell}>{clientName}</TableCell>
        <TableCell className={classNameCell}>{invoice.status}</TableCell>
        <TableCell className={classNameCell} align="right">
          {invoice.taxRate
            ? toEuro(invoice.total * (1 + invoice.taxRate / 100))
            : toEuro(invoice.total)}
        </TableCell>
        <TableCell className={classNameCell} align="right">
          {renderAction()}
        </TableCell>
      </TableRow>

      {isDraft && (
        <Confirm
          open={confirm}
          onCancel={closeConfirm}
          onConfirm={lockAndDownload}
        />
      )}

      {readyToDownload && (
        <Document
          onSuccess={handleDownloadSuccess}
          onError={handleDownloadError}
          invoice={invoice}
          client={client}
        />
      )}
    </Fragment>
  )
}
