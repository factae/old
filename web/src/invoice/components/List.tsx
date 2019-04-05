import React, {useContext} from 'react'
import isNull from 'lodash/fp/isNull'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import InvoiceContext from '../context'
import InvoiceListItem from './ListItem'

export default function() {
  const [invoices] = useContext(InvoiceContext)

  if (isNull(invoices)) {
    return null
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Numéro</TableCell>
          <TableCell>Client</TableCell>
          <TableCell align="center">Statut</TableCell>
          <TableCell align="right">Total HT</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {invoices.map((invoice, key) => (
          <InvoiceListItem key={key} invoice={invoice} />
        ))}
      </TableBody>
    </Table>
  )
}
