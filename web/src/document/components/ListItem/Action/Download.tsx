import React, {MouseEvent} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import IconDownload from '@material-ui/icons/SaveAlt'

import {Document} from '../../../model'

import {useStyles} from './styles'

type Props = {
  document: Document
}

export default function(props: Props) {
  const {document} = props
  const classes = useStyles()

  function stopPropagation(event: MouseEvent) {
    event.stopPropagation()
  }

  return (
    <Tooltip placement="bottom" title="Télécharger">
      <span className={classes.icon}>
        <IconButton
          href={String(document.pdf)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stopPropagation}
        >
          <IconDownload />
        </IconButton>
      </span>
    </Tooltip>
  )
}
