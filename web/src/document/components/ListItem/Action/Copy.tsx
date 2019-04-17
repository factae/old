import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import IconCopy from '@material-ui/icons/FileCopyOutlined'

import useRouting from '../../../../common/hooks/routing'
import {Document} from '../../../model'

import {useStyles} from './styles'

type Props = {
  document: Document
}

export default function(props: Props) {
  const {document} = props
  const {goTo} = useRouting()
  const classes = useStyles()

  function copy() {
    goTo('documentEdit', {
      ...document,
      id: -1,
      number: '-',
      status: 'draft',
      items: document.items.map(item => ({
        ...item,
        id: -1,
        document: null,
      })),
    })
  }

  return (
    <Tooltip placement="bottom" title="Copier">
      <span className={classes.icon}>
        <IconButton onClick={copy}>
          <IconCopy />
        </IconButton>
      </span>
    </Tooltip>
  )
}
