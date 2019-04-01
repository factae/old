import React, {Fragment, useContext} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import IconDownload from '@material-ui/icons/SaveAlt'
import IconTransform from '@material-ui/icons/Redo'

import AsyncContext from '../../../../../common/contexts/async'
import useRouting from '../../../../../common/hooks/routing'
import {Quotation} from '../../../../model'

import {useStyles} from './styles'

interface Props {
  quotation: Quotation
}

export default function(props: Props) {
  const {quotation} = props
  const {goTo} = useRouting()
  const {loading} = useContext(AsyncContext)
  const classes = useStyles()

  return (
    <Fragment>
      <Tooltip placement="bottom" title="Transformer en facture">
        <span className={classes.icon}>
          <IconButton
            disabled={loading}
            onClick={goTo('invoiceEdit', {
              ...quotation,
              id: null,
              toto: 'lol',
              status: 'draft',
              items: quotation.items.map(item => ({
                ...item,
                id: null,
                contract: null,
              })),
            })}
          >
            <IconTransform />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip placement="bottom" title="Télécharger">
        <span className={classes.icon}>
          <IconButton
            href={quotation.pdf || '#'}
            target="_blank"
            rel="noopener noreferrer"
            disabled={loading}
          >
            <IconDownload />
          </IconButton>
        </span>
      </Tooltip>
    </Fragment>
  )
}
