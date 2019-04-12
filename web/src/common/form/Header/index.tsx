import React from 'react'
import noop from 'lodash/noop'
import get from 'lodash/get'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import {SvgIconProps} from '@material-ui/core/SvgIcon'
import IconBack from '@material-ui/icons/ArrowBack'

import {useStyles} from './styles'

type Props = {
  title: string
  onBack?: () => void
  action?: {
    ref?: (ref: HTMLButtonElement) => void
    label: string
    icon: React.ComponentType<SvgIconProps>
    onClick?: () => void
  }
}

export default function(props: Props) {
  const classes = useStyles()
  const triggerAction = get(props, 'action.onClick', noop)
  const ref = get(props, 'action.ref', noop)

  return (
    <Typography variant="h3" component="h1" className={classes.title}>
      {props.onBack && (
        <IconButton onClick={props.onBack}>
          <IconBack />
        </IconButton>
      )}
      {props.title}
      {props.action && (
        <div className={classes.action}>
          <Button
            buttonRef={ref}
            type="submit"
            variant="contained"
            color="secondary"
            onClick={triggerAction}
          >
            <props.action.icon className={classes.icon} />
            {props.action.label}
          </Button>
        </div>
      )}
    </Typography>
  )
}
