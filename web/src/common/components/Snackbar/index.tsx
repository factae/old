import React, {useEffect, useState} from 'react'
import classNames from 'classnames'
import isEmpty from 'lodash/fp/isEmpty'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

import {useStyles} from './styles'

type SnackbarEvent = React.SyntheticEvent<any, Event>

type Props = {
  message: string
  onClose: () => void
}

export default function(props: Props) {
  const {message, onClose: handleClose} = props
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    if (!isEmpty(message)) {
      setOpen(true)
    }
  }, [message])

  function close(_event: SnackbarEvent, reason?: string) {
    if (reason !== 'clickaway') {
      setOpen(false)
      handleClose()
    }
  }

  const className = classNames(classes.snackbar, {
    [classes.error]: message.match(/^Erreur/),
  })

  return (
    <Snackbar
      anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
      autoHideDuration={4000}
      onClick={close}
      onClose={close}
      open={open}
    >
      <SnackbarContent message={message} className={className} />
    </Snackbar>
  )
}
