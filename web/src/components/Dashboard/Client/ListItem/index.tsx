import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import Client from '../../../../models/Client'
import useRouting from '../../../../hooks/routing'

import {useStyles} from './styles'

interface Props {
  client: Client
}

export default function(props: Props) {
  const {client} = props
  const {goTo} = useRouting()
  const classes = useStyles()

  return (
    <TableRow className={classes.row} onClick={goTo('clientEdit', client.id)}>
      <TableCell>{client.firstName}</TableCell>
      <TableCell>{client.lastName}</TableCell>
      <TableCell>{client.email}</TableCell>
      <TableCell>{client.phone}</TableCell>
    </TableRow>
  )
}
