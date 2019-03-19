import React, {Fragment, MouseEvent, useContext, useState} from 'react'
import {BlobProvider, Document, Page, Text} from '@react-pdf/renderer'
import classNames from 'classnames'
import find from 'lodash/find'
import isNull from 'lodash/isNull'
import noop from 'lodash/noop'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import IconDownload from '@material-ui/icons/SaveAlt'
import IconSign from '@material-ui/icons/Check'

import ClientContext from '../../client/context'
import AsyncContext from '../../common/contexts/async'
import useRouting from '../../common/hooks/routing'
import {Quotation} from '../model'
import QuotationContext from '../context'
import * as service from '../service'
import Confirm from './Confirm'
import Download from './Download'

import {useStyles} from './styles'

interface Props {
  quotation: Quotation
}

export default function(props: Props) {
  const {quotation} = props

  const async = useContext(AsyncContext)
  const [clients] = useContext(ClientContext)
  const dispatch = useContext(QuotationContext)[1]
  const [confirm, setConfirm] = useState(false)
  const [readyToDownload, setReadyToDownload] = useState(false)
  const {goTo} = useRouting()

  const client = find(clients, {id: quotation.clientId})
  const clientName = `${client!.firstName} ${client!.lastName}`
  const isDraft = quotation.status === 'draft'

  const classes = useStyles()
  const classNameCell = classNames({[classes.nonDraft]: !isDraft})

  if (isNull(clients)) {
    return null
  }

  function openConfirm(event: MouseEvent) {
    event.stopPropagation()
    setConfirm(true)
  }

  function closeConfirm() {
    setConfirm(false)
  }

  function download(event: MouseEvent) {
    event.stopPropagation()
    async.start()
    setReadyToDownload(true)
  }

  async function lockAndDownload() {
    try {
      async.start()
      closeConfirm()
      quotation.status = 'downloaded'
      dispatch({type: 'update', quotation})
      await service.update(quotation)
      setReadyToDownload(true)
    } catch (error) {
      handleErrorDownload(error)
    }
  }

  async function sign() {
    try {
      async.start()
      quotation.status = 'signed'
      dispatch({type: 'update', quotation})
      await service.update(quotation)
      async.stop()
    } catch (error) {
      async.stop('Erreur lors de la mise à jour du devis !')
    }
  }

  function handleSuccessDownload() {
    setReadyToDownload(false)
    async.stop()
  }

  function handleErrorDownload(error: Error) {
    console.error(error)
    setReadyToDownload(false)
    async.stop('Erreur lors du téléchargement du devis !')
  }

  function renderAction() {
    switch (quotation.status) {
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

      case 'downloaded':
        return (
          <Fragment>
            <Tooltip placement="bottom" title="Devis signé">
              <span className={classes.icon}>
                <IconButton onClick={sign} disabled={async.loading}>
                  <IconSign />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip placement="bottom" title="Télécharger">
              <span className={classes.icon}>
                <IconButton onClick={download} disabled={async.loading}>
                  <IconDownload />
                </IconButton>
              </span>
            </Tooltip>
          </Fragment>
        )

      case 'signed':
        return (
          <Tooltip placement="bottom" title="Télécharger">
            <span className={classes.icon}>
              <IconButton onClick={download} disabled={async.loading}>
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
        onClick={isDraft ? goTo('quotationEdit', quotation.id) : noop}
      >
        <TableCell className={classNameCell}>{quotation.number}</TableCell>
        <TableCell className={classNameCell}>{clientName}</TableCell>
        <TableCell className={classNameCell}>{quotation.status}</TableCell>
        <TableCell className={classNameCell} align="right">
          {(quotation.total * (1 + quotation.taxRate / 100)).toFixed(2)} €
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
        <BlobProvider
          document={
            <Document>
              <Page>
                <Text>Coucou</Text>
              </Page>
            </Document>
          }
        >
          {blobProps => (
            <Download
              {...blobProps}
              fileName={`devis-${quotation.number}.pdf`}
              onSuccess={handleSuccessDownload}
              onError={handleErrorDownload}
            />
          )}
        </BlobProvider>
      )}
    </Fragment>
  )
}
