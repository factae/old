import React, {Fragment, MouseEvent} from 'react'
import MenuItem from '@material-ui/core/MenuItem'

import useAsyncContext from '../../../../async/context'
import {Document} from '../../../../document/model'
import useDocumentContext from '../../../../document/context'
import * as $document from '../../../../document/service'
import {useUserSetting} from '../../../../user/hooks'

type Props = {
  document: Document
  onClick: () => void
}

export default function({document, onClick: closeMenu}: Props) {
  const userHasAutoSend = useUserSetting('documentAutoSend')
  const async = useAsyncContext()
  const {dispatch, download} = useDocumentContext()
  const title = userHasAutoSend ? 'Sauvegarder & Envoyer' : 'Sauvegarder'

  async function remove(event: MouseEvent) {
    event.stopPropagation()
    closeMenu()

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
    closeMenu()

    try {
      async.start()
      document.status = 'pending'
      await $document.update(document)
      document.pdf = await download(document)
      dispatch({document, type: 'update'})
      await $document.update(document)
      async.stop()
    } catch (error) {
      console.error(error.toString())
      async.stop('Erreur : échec de la sauvegarde')
    }
  }

  return (
    <Fragment>
      <MenuItem onClick={save}>{title}</MenuItem>
      <MenuItem onClick={remove}>Supprimer</MenuItem>
    </Fragment>
  )
}
