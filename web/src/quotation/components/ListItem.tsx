import React, {MouseEvent, useContext} from 'react'
import find from 'lodash/find'
import isNull from 'lodash/isNull'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import IconDownload from '@material-ui/icons/SaveAlt'

import ClientContext from '../../client/context'
import useRouting from '../../common/hooks/routing'
import {Quotation} from '../model'

import {useStyles} from './styles'

interface Props {
  quotation: Quotation
  onConfirmDownload: (event: MouseEvent) => void
}

export default function(props: Props) {
  const [clients] = useContext(ClientContext)
  if (isNull(clients)) return null

  const {quotation} = props
  const {goTo} = useRouting()
  const client = find(clients, {id: quotation.clientId})
  const classes = useStyles()

  return (
    <TableRow
      className={classes.row}
      onClick={goTo('quotationEdit', quotation.id)}
    >
      <TableCell>{quotation.number}</TableCell>
      <TableCell>
        {client!.firstName} {client!.lastName}
      </TableCell>
      <TableCell>{quotation.status}</TableCell>
      <TableCell align="right">
        {(quotation.total * (1 + quotation.taxRate / 100)).toFixed(2)} €
      </TableCell>
      <TableCell align="right">
        <Tooltip placement="bottom" title="Télécharger">
          <IconButton onClick={props.onConfirmDownload}>
            <IconDownload />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}
