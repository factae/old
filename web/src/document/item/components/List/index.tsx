import React from 'react'
import classNames from 'classnames'
import isNull from 'lodash/isNull'
import isEmpty from 'lodash/isEmpty'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconDelete from '@material-ui/icons/Clear'

import {DocumentItem} from '../../model'
import {toEuro} from '../../../../common/utils/currency'

import {useStyles} from './styles'

type Props = {
  items: DocumentItem[]
  onDelete: (index: number) => void
  total: number
  taxRate: number | null
}

export default function(props: Props) {
  const {items, total, taxRate} = props
  const broadcastDelete = props.onDelete
  const classes = useStyles()
  const containerClassName = classNames(classes.container, {
    [classes.hide]: isEmpty(items),
  })

  return (
    <Grid item xs={12} className={containerClassName}>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Quantité</TableCell>
              <TableCell align="right">Prix unitaire</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, key) => (
              <TableRow key={key}>
                <TableCell>
                  <IconButton
                    className={classes.delete}
                    onClick={() => broadcastDelete(key)}
                  >
                    <IconDelete />
                  </IconButton>
                  {item.description}
                </TableCell>
                <TableCell align="right">
                  {isNull(item.quantity) ? '' : item.quantity}
                </TableCell>
                <TableCell align="right">{toEuro(item.unitPrice)}</TableCell>
                <TableCell align="right">{toEuro(item.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            {!isNull(taxRate) && (
              <TableRow>
                <TableCell align="right" colSpan={3}>
                  Total HT :
                  <br />
                  TVA :
                </TableCell>
                <TableCell align="right">
                  {toEuro(total)}
                  <br />
                  {taxRate} %
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell align="right" colSpan={3}>
                Total TTC :
              </TableCell>
              <TableCell align="right">
                {toEuro(total * (1 + Number(taxRate) * 0.01))}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    </Grid>
  )
}
