import React from 'react'
import noop from 'lodash/noop'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import {SvgIconProps} from '@material-ui/core/SvgIcon'
import IconBack from '@material-ui/icons/ArrowBack'

import {useStyles} from './styles'

type Props = {
  title: string
  onBack: () => void
  action: {
    label: string
    icon: React.ComponentType<SvgIconProps>
    onClick?: () => void
  }
}

export default function(props: Props) {
  const classes = useStyles()
  const triggerAction = props.action.onClick || noop

  return (
    <Typography variant="h3" component="h1" className={classes.title}>
      <IconButton onClick={props.onBack}>
        <IconBack />
      </IconButton>
      {props.title}
      <div className={classes.action}>
        <Fab
          variant="extended"
          type="submit"
          aria-owns="menu-appbar"
          aria-haspopup="true"
          size="medium"
          color="secondary"
          onClick={triggerAction}
        >
          <props.action.icon className={classes.icon} />
          {props.action.label}
        </Fab>
      </div>
    </Typography>
  )
}
