import React, {Fragment} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import IconDownload from '@material-ui/icons/SaveAlt'

import {Invoice} from '../../../../model'

import {useStyles} from './styles'

interface Props {
  invoice: Invoice
}

export default function(props: Props) {
  const {invoice} = props
  const classes = useStyles()

  return (
    <Fragment>
      <Tooltip placement="bottom" title="Télécharger">
        <span className={classes.icon}>
          <IconButton
            href={String(invoice.pdf)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconDownload />
          </IconButton>
        </span>
      </Tooltip>
    </Fragment>
  )
}
