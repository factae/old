import React, {Suspense, lazy} from 'react'
import classNames from 'classnames'
import _ from 'lodash/fp'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import Date from '../../../contract/components/ListItem/Date'
import Status from '../../../contract/components/ListItem/Status'
import useClientContext from '../../../client/context'
import useRouting from '../../../common/hooks/routing'
import {toEuro} from '../../../common/utils/currency'
import {Invoice} from '../../model'

import {useStyles} from './styles'

type Props = {
  invoice: Invoice
}

export default function({invoice}: Props) {
  const classes = useStyles()
  const {goTo} = useRouting()
  const [clients] = useClientContext()

  if (_.isNull(clients)) {
    return null
  }

  function buildClientName() {
    const client = _.find({id: invoice.clientId}, clients)
    if (_.isNil(client)) return ''

    const firstName = _.startCase(client.firstName || '')
    const lastName = _.upperCase(client.lastName || '')

    return _.trim(`${firstName} ${lastName}`)
  }

  const Action = lazy(() => import(`./Action/${_.capitalize(invoice.status)}`))

  const isEditable = invoice.status !== 'paid'
  const className = classNames({[classes.editable]: isEditable})
  const handleRowClick = isEditable
    ? () => goTo('invoiceEdit', invoice.id)
    : _.noop

  return (
    <TableRow className={className} onClick={handleRowClick}>
      <TableCell>{invoice.number}</TableCell>
      <Date value={invoice.createdAt} />
      <TableCell>{buildClientName()}</TableCell>
      <Status value={invoice.status} />
      <TableCell align="right">{toEuro(invoice.total)}</TableCell>
      <TableCell align="right">
        <Suspense fallback={null}>
          <Action invoice={invoice} />
        </Suspense>
      </TableCell>
    </TableRow>
  )
}
