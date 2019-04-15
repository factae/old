import React, {Fragment, MouseEvent} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import IconDelete from '@material-ui/icons/Clear'
import IconSave from '@material-ui/icons/Save'
import IconSaveAndSend from '@material-ui/icons/Send'

import useAsyncContext from '../../../../async/context'
import {Document} from '../../../../document/model'
import useDocumentContext from '../../../../document/context'
import * as $document from '../../../../document/service'
import {useUserSetting} from '../../../../user/hooks'

import {useStyles} from './styles'

type Props = {
  document: Document
}

export default function({document}: Props) {
  const classes = useStyles()
  const userHasAutoSend = useUserSetting('documentAutoSend')
  const async = useAsyncContext()
  const {dispatch, download} = useDocumentContext()
  const title = userHasAutoSend ? 'Sauvegarder & Envoyer' : 'Sauvegarder'

  async function remove(event: MouseEvent) {
    event.stopPropagation()

    try {
      async.start()
      await $document.delete(document.id)
      dispatch({type: 'delete', id: document.id})
      async.stop()
    } catch (error) {
      console.error(error.toString())
      async.stop(`Erreur : ${error.response.data}`)
    }
  }

  async function save(event: MouseEvent) {
    event.stopPropagation()

    try {
      async.start()
      document.status = 'pending'
      await $document.update(document)
      document.pdf = await download(document)
      dispatch({type: 'update', document})
      await $document.update(document)
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
      <Tooltip placement="bottom" title="Supprimer">
        <span className={classes.icon}>
          <IconButton onClick={remove}>
            <IconDelete />
          </IconButton>
        </span>
      </Tooltip>
    </Fragment>
  )
}
