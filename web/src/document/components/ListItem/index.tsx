import React, {Suspense, lazy} from 'react'
import classNames from 'classnames'
import {DateTime} from 'luxon'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
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

  if (_.isNull(clients)) {
    return null
  }

  function buildClientName() {
    const client = _.find({id: document.clientId}, clients)
    if (_.isNil(client)) return '-'
    return getClientName(client)
  }

  const Action = lazy(() => import(`./Action/${_.capitalize(document.status)}`))

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
        <Suspense fallback={null}>
          <Action document={document} />
        </Suspense>
      </TableCell>
    </TableRow>
  )
}
