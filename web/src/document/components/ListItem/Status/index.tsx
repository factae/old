import React from 'react'
import classNames from 'classnames'
import TableCell from '@material-ui/core/TableCell'

import {Document} from '../../../model'
import Chip from './Chip'

import {useStyles} from './styles'

type Props = {
  value: Document['status']
}

export default function({value}: Props) {
  const classes = useStyles()
  const classNameCell = classNames({[classes.nonPending]: status !== 'pending'})

  return (
    <TableCell className={classNameCell} align="center">
      <Chip value={value} />
    </TableCell>
  )
}
