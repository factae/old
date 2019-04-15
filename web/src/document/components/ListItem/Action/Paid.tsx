import React, {Fragment} from 'react'
import ActionCopy from './Copy'
import ActionDownload from './Download'

import {Document} from '../../../model'

type Props = {
  document: Document
}

export default function(props: Props) {
  const {document} = props

  return (
    <Fragment>
      <ActionCopy document={document} />
      <ActionDownload document={document} />
    </Fragment>
  )
}
