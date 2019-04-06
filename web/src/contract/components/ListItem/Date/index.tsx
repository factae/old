import React, {memo} from 'react'
import isNull from 'lodash/isNull'
import {DateTime} from 'luxon'
import Tooltip from '@material-ui/core/Tooltip'
import TableCell from '@material-ui/core/TableCell'

type Props = {
  value: DateTime | null
}

export default memo(({value}: Props) => {
  if (isNull(value)) {
    return <TableCell>-</TableCell>
  }

  const dateFromNow = value.toRelative({locale: 'fr'})
  const fullDate = value.toFormat(`'Le' dd/LL/yyyy à HH'h'mm`)

  return (
    <TableCell>
      <Tooltip title={fullDate} placement="bottom">
        <span>{dateFromNow}</span>
      </Tooltip>
    </TableCell>
  )
})
