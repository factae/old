import React from 'react'
import classNames from 'classnames'
import Chip from '@material-ui/core/Chip'
import TableCell from '@material-ui/core/TableCell'
import IconValidated from '@material-ui/icons/Schedule'
import IconDraft from '@material-ui/icons/DescriptionOutlined'
import IconSigned from '@material-ui/icons/CheckCircle'
import IconPaid from '@material-ui/icons/MonetizationOn'

import {useStyles} from './styles'

interface Props {
  status: 'draft' | 'validated' | 'signed' | 'paid'
}

function renderChip(status: Props['status']) {
  switch (status) {
    case 'draft':
      return <Chip variant="default" label="brouillon" icon={<IconDraft />} />

    case 'validated':
      return (
        <Chip variant="outlined" label="en cours" icon={<IconValidated />} />
      )

    case 'signed':
      return <Chip color="secondary" label="signé" icon={<IconSigned />} />

    case 'paid':
      return <Chip color="secondary" label="payé" icon={<IconPaid />} />
  }
}

export default function({status}: Props) {
  const classes = useStyles()
  const classNameCell = classNames({[classes.nonDraft]: status !== 'draft'})

  return (
    <TableCell className={classNameCell} align="center">
      {renderChip(status)}
    </TableCell>
  )
}
