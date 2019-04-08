import React, {Fragment, ReactNode, useContext} from 'react'
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import {SvgIconProps} from '@material-ui/core/SvgIcon'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

import useAsyncContext from '../../../async/context'
import {useStyles} from './styles'

type Action = {
  tooltip: string
  icon: React.ComponentType<SvgIconProps>
  onClick: () => void
}

interface Props {
  title: React.ReactNode
  subtitle?: React.ReactNode
  action?: Action
  children?: ReactNode
}

export default function(props: Props) {
  const {title, subtitle, action, children} = props
  const {loading} = useAsyncContext()
  const classes = useStyles()

  return (
    <Fragment>
      <Typography className={classNames(classes.title, {[classes.withSubtitle]: subtitle})} variant="h5" component="h2">
        {title}
        {action && (
          <Tooltip
            className={classes.tooltip}
            placement="right"
            title={action.tooltip}
            aria-label={action.tooltip}
          >
            <div>
              <IconButton
                classes={{root: classes.action}}
                color="primary"
                aria-haspopup="true"
                onClick={action.onClick}
                disabled={loading}
              >
                <action.icon />
              </IconButton>
            </div>
          </Tooltip>
        )}
      </Typography>

      {subtitle && (
        <Typography className={classes.subtitle} color="textSecondary">
          <em>{subtitle}</em>
        </Typography>
      )}

      <Grid container spacing={16}>
        {children}
      </Grid>
    </Fragment>
  )
}
