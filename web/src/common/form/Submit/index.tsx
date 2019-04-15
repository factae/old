import React from 'react'
import noop from 'lodash/noop'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconSave from '@material-ui/icons/Save'

import {useStyles} from './styles'

type Props = {
  onClick?: () => void
  disabled?: boolean
}

export default function(props: Props) {
  const disabled = Boolean(props.disabled)
  const triggerClick = props.onClick || noop
  const classes = useStyles()

  return (
    <Grid className={classes.container} item xs={12}>
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        onClick={triggerClick}
        disabled={disabled}
      >
        <IconSave className={classes.icon} /> Sauvegarder
      </Button>
    </Grid>
  )
}
