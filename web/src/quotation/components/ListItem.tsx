import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import Quotation from '../model'

import {useStyles} from './styles'

interface Props {
  quotation: Quotation
}

export default function(props: Props) {
  const {quotation} = props
  const classes = useStyles()

  return (
    <TableRow className={classes.row}>
      <TableCell>{quotation.number}</TableCell>
      <TableCell align="right">{quotation.total.toFixed(2)} €</TableCell>
      <TableCell align="right">
        {(quotation.total * (1 + quotation.taxRate / 100)).toFixed(2)} €
      </TableCell>
    </TableRow>
  )
}
