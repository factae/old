import React, {MouseEvent} from 'react'
import MenuItem from '@material-ui/core/MenuItem'

import {Document} from '../../../model'

type Props = {
  document: Document
  onClick: () => void
}

export default function({document, onClick: closeMenu}: Props) {
  function stopPropagation(event: MouseEvent) {
    event.stopPropagation()
    closeMenu()
  }

  return (
    <MenuItem
      component="a"
      onClick={stopPropagation}
      href={String(document.pdf)}
      target="_blank"
      rel="noopener noreferrer"
    >
      Télécharger
    </MenuItem>
  )
}
