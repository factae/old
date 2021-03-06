import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import {Client} from '../model'
import useRouting from '../../common/hooks/routing'

import {useStyles} from './styles'

type Props = {
  client: Client
}

export default function(props: Props) {
  const {client} = props
  const {goTo} = useRouting()
  const classes = useStyles()

  return (
    <TableRow
      className={classes.row}
      onClick={() => goTo('clientEdit', client.id)}
    >
      <TableCell>{client.firstName}</TableCell>
      <TableCell>{client.lastName}</TableCell>
      <TableCell>{client.tradingName || '-'}</TableCell>
      <TableCell>{client.email}</TableCell>
      <TableCell>{client.phone}</TableCell>
    </TableRow>
  )
}
