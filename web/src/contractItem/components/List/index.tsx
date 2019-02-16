import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Edit from '../Edit'
import {ContractItem} from '../../model'
import {toEuro} from '../../../common/utils/currency'

import {useStyles} from './styles'

type Props = {
  total: number
  taxRate: number
  value: ContractItem[]
  onSubmit: (contractItem: ContractItem) => void
}

export default function(props: Props) {
  const {total, taxRate, value: contractItems} = props
  const classes = useStyles()

  return (
    <Grid item xs={12} className={classes.container}>
      <Paper>
        <Table>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Prix unitaire</TableCell>
              <TableCell align="right">Quantité</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Edit onSubmit={props.onSubmit} />
            {contractItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell align="right">{toEuro(item.unitPrice)}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{toEuro(item.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className={classes.footer}>
            {taxRate > 0 && (
              <TableRow>
                <TableCell align="right">Total HT:</TableCell>
                <TableCell align="right" colSpan={3}>
                  {toEuro(total)}
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell align="right">Total TTC :</TableCell>
              <TableCell align="right" colSpan={3}>
                {toEuro(total * (1 + taxRate * 0.01))}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    </Grid>
  )
}
