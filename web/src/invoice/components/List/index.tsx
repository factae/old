import React from 'react'
import isNull from 'lodash/fp/isNull'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import useInvoiceContext from '../../context'
import InvoiceListItem from '../ListItem'

import {useStyles} from './styles'

export default function() {
  const [invoices] = useInvoiceContext()
  const classes = useStyles()

  if (isNull(invoices)) {
    return null
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={classes.number}>Numéro</TableCell>
          <TableCell className={classes.date}>Date</TableCell>
          <TableCell className={classes.client}>Client</TableCell>
          <TableCell className={classes.status}>Statut</TableCell>
          <TableCell className={classes.total}>Total HT</TableCell>
          <TableCell className={classes.actions}>Actions</TableCell>
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
