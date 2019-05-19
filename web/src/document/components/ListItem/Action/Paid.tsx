import React, {Fragment} from 'react'
import ActionCopy from './Copy'
import ActionDownload from './Download'

import {Document} from '../../../model'

type Props = {
  document: Document
  onClick: () => void
}

export default function({document, onClick}: Props) {
  return (
    <Fragment>
      <ActionCopy document={document} />
      <ActionDownload document={document} onClick={onClick} />
    </Fragment>
  )
}
