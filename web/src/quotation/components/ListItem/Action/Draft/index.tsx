import React, {Fragment, MouseEvent} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import IconSave from '@material-ui/icons/Save'
import IconSaveAndSend from '@material-ui/icons/Send'

import useAsyncContext from '../../../../../async/context'
import {Quotation} from '../../../../../quotation/model'
import useQuotationContext from '../../../../../quotation/context'
import * as $quotation from '../../../../../quotation/service'
import {useUserSetting} from '../../../../../user/hooks'

import {useStyles} from './styles'

type Props = {
  quotation: Quotation
}

export default function({quotation}: Props) {
  const classes = useStyles()
  const userHasAutoSend = useUserSetting('quotationAutoSend')
  const async = useAsyncContext()
  const {dispatch, download} = useQuotationContext()
  const title = userHasAutoSend ? 'Sauvegarder & Envoyer' : 'Sauvegarder'

  async function save(event: MouseEvent) {
    event.stopPropagation()

    try {
      async.start()
      quotation.pdf = await download(quotation)
      quotation.status = 'pending'
      await $quotation.update(quotation)
      dispatch({type: 'update', quotation})
      async.stop()
    } catch (error) {
      console.error(error.toString())
      async.stop('Erreur : échec de la sauvegarde')
    }
  }

  return (
    <Fragment>
      <Tooltip placement="bottom" title={title}>
        <span className={classes.icon}>
          <IconButton onClick={save}>
            {userHasAutoSend ? <IconSaveAndSend /> : <IconSave />}
          </IconButton>
        </span>
      </Tooltip>
    </Fragment>
  )
}
