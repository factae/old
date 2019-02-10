import React, {useContext} from 'react'
import isNull from 'lodash/fp/isNull'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import ClientContext from '../../../../contexts/client'
import ClientListItem from '../ListItem'

export default function() {
  const {state: clients} = useContext(ClientContext)

  if (isNull(clients)) {
    return null
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Prénom</TableCell>
          <TableCell>Nom</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Téléphone</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {clients.map(client => (
          <ClientListItem key={client.id} client={client} />
        ))}
      </TableBody>
    </Table>
  )
}
