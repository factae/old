import React from 'react'
import Chip from '@material-ui/core/Chip'
import IconDraft from '@material-ui/icons/DescriptionOutlined'
import IconValidated from '@material-ui/icons/Schedule'
import IconSigned from '@material-ui/icons/CheckCircle'
import IconPaid from '@material-ui/icons/EuroSymbol'

import {Document} from '../../../model'

type Props = {
  value: Document['status']
}

export default function({value}: Props) {
  switch (value) {
    case 'draft':
      return <Chip component="span" label="brouillon" icon={<IconDraft />} />

    case 'pending':
      return (
        <Chip
          component="span"
          variant="outlined"
          label="en cours"
          icon={<IconValidated />}
        />
      )

    case 'signed':
      return (
        <Chip
          component="span"
          color="primary"
          label="signé"
          icon={<IconSigned />}
        />
      )

    case 'paid':
      return (
        <Chip
          component="span"
          color="secondary"
          label="payé"
          icon={<IconPaid />}
        />
      )

    default:
      return null
  }
}
