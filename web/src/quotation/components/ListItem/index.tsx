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
import {Quotation} from '../../model'

import {useStyles} from './styles'

type Props = {
  quotation: Quotation
}

export default function({quotation}: Props) {
  const classes = useStyles()
  const {goTo} = useRouting()
  const [clients] = useClientContext()

  if (_.isNull(clients)) {
    return null
  }

  function buildClientName() {
    const client = _.find({id: quotation.clientId}, clients)
    if (_.isNil(client)) return ''

    const firstName = _.startCase(client.firstName || '')
    const lastName = _.upperCase(client.lastName || '')

    return _.trim(`${firstName} ${lastName}`)
  }

  const Action = lazy(() =>
    import(`./Action/${_.capitalize(quotation.status)}`),
  )

  const isEditable = quotation.status !== 'signed'
  const className = classNames({[classes.editable]: isEditable})
  const handleRowClick = isEditable
    ? () => goTo('quotationEdit', quotation.id)
    : _.noop

  return (
    <TableRow className={className} onClick={handleRowClick}>
      <Date value={quotation.createdAt} />
      <TableCell>{buildClientName()}</TableCell>
      <Status value={quotation.status} />
      <TableCell align="right">{toEuro(quotation.total)}</TableCell>
      <TableCell align="right">
        <Suspense fallback={null}>
          <Action quotation={quotation} />
        </Suspense>
      </TableCell>
    </TableRow>
  )
}
