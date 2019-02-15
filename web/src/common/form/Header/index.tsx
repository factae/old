import React, {useContext} from 'react'
import noop from 'lodash/fp/noop'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import {SvgIconProps} from '@material-ui/core/SvgIcon'
import IconBack from '@material-ui/icons/ArrowBack'

import useRouting from '../../../common/hooks/routing'
import AsyncContext from '../../../common/contexts/async'

import {useStyles} from './styles'

interface Props {
  title: string
  label: string
  icon: React.ComponentType<SvgIconProps>
  onClick?: () => void
}

export default function(props: Props) {
  const {title, label, icon: Icon} = props
  const handleClick = props.onClick || noop
  const {loading} = useContext(AsyncContext)
  const {goBack} = useRouting()
  const classes = useStyles()

  return (
    <Typography variant="h3" component="h1" className={classes.title}>
      <IconButton onClick={goBack} disabled={loading}>
        <IconBack />
      </IconButton>
      {title}
      <div className={classes.action}>
        <Fab
          variant="extended"
          type="submit"
          aria-owns="menu-appbar"
          aria-haspopup="true"
          size="medium"
          color="secondary"
          disabled={loading}
          onClick={handleClick}
        >
          <Icon className={classes.icon} />
          {label}
        </Fab>
      </div>
    </Typography>
  )
}
