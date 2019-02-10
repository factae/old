import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import Quotation from '../../../../models/Quotation'
import useRouting from '../../../../hooks/routing'

import {useStyles} from './styles'

interface Props {
  quotation: Quotation
}

export default function(props: Props) {
  const {quotation} = props
  const {goTo} = useRouting()
  const classes = useStyles()

  return (
    <TableRow
      className={classes.row}
      onClick={goTo('quotationEdit', quotation.id)}
    >
      <TableCell />
      <TableCell />
      <TableCell />
      <TableCell />
    </TableRow>
  )
}
