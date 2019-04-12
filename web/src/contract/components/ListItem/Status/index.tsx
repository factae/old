import React from 'react'
import classNames from 'classnames'
import Chip from '@material-ui/core/Chip'
import TableCell from '@material-ui/core/TableCell'
import IconDraft from '@material-ui/icons/DescriptionOutlined'
import IconValidated from '@material-ui/icons/Schedule'
import IconSigned from '@material-ui/icons/CheckCircle'
import IconPaid from '@material-ui/icons/EuroSymbol'

import {Contract} from '../../../model'

import {useStyles} from './styles'

interface Props {
  value: Contract['status']
}

function renderChip(value: Props['value']) {
  switch (value) {
    case 'draft':
      return <Chip label="brouillon" icon={<IconDraft />} />

    case 'pending':
      return (
        <Chip variant="outlined" label="en cours" icon={<IconValidated />} />
      )

    case 'signed':
      return <Chip color="secondary" label="signé" icon={<IconSigned />} />

    case 'paid':
      return <Chip color="secondary" label="payé" icon={<IconPaid />} />
  }
}

export default function({value}: Props) {
  const classes = useStyles()
  const classNameCell = classNames({[classes.nonPending]: status !== 'pending'})

  return (
    <TableCell className={classNameCell} align="center">
      {renderChip(value)}
    </TableCell>
  )
}
