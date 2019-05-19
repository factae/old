import React, {MouseEvent, useEffect, useRef, useState} from 'react'
import classNames from 'classnames'
import {DateTime} from 'luxon'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import IconAction from '@material-ui/icons/ExpandMore'
import TableRow from '@material-ui/core/TableRow'
import Menu from '@material-ui/core/Menu'
import _ from 'lodash/fp'

import Date from './Date'
import Status from './Status'
import useClientContext from '../../../client/context'
import {getClientName} from '../../../client/model'
import useRouting from '../../../common/hooks/routing'
import {toEuro} from '../../../common/utils/currency'
import {Document} from '../../model'

import {useStyles} from './styles'

type Props = {
  document: Document
}

export default function({document}: Props) {
  const classes = useStyles()
  const {goTo} = useRouting()
  const [clients] = useClientContext()
  const [anchorEl, setLocalAnchorEl] = useState<HTMLElement | null>(null)
  const Action = useRef<any>(null)

  async function fetchActions() {
    const module = await import(`./Action/${_.capitalize(document.status)}`)
    Action.current = module.default
  }

  useEffect(() => {
    fetchActions()
  }, [document.status])

  if (_.isNull(clients)) {
    return null
  }

  function setAnchorEl(event: MouseEvent) {
    event.stopPropagation()
    setLocalAnchorEl(event.currentTarget as HTMLElement)
  }

  function closeMenu(event: MouseEvent) {
    _.invoke('stopPropagation', event)
    setLocalAnchorEl(null)
  }

  function buildClientName() {
    const client = _.find({id: document.clientId}, clients)
    if (_.isNil(client)) return '-'

    return getClientName(client)
  }

  const isEditable = !['signed', 'paid'].includes(document.status)
  const className = classNames({[classes.editable]: isEditable})
  const handleRowClick = isEditable
    ? () => goTo('documentEdit', document.id)
    : _.noop

  return (
    <TableRow className={className} onClick={handleRowClick}>
      <TableCell>{_.getOr('-', 'number', document)}</TableCell>
      <Date value={DateTime.fromISO(document.createdAt || '')} />
      <TableCell>{buildClientName()}</TableCell>
      <Status value={document.status} />
      <TableCell align="right">{toEuro(document.total)}</TableCell>
      <TableCell align="right">
        <IconButton
          aria-owns={anchorEl ? `document-${document.id}` : undefined}
          aria-haspopup="true"
          color="inherit"
          onClick={setAnchorEl}
        >
          <IconAction />
        </IconButton>
        {Action.current && (
          <Menu
            id={`document-${document.id}`}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
          >
            <Action.current onClick={closeMenu} document={document} />
          </Menu>
        )}
      </TableCell>
    </TableRow>
  )
}
