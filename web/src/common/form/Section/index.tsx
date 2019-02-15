import React, {Fragment, ReactNode, useContext} from 'react'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import {SvgIconProps} from '@material-ui/core/SvgIcon'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

import AsyncContext from '../../../common/contexts/async'
import {useStyles} from './styles'

type Action = {
  tooltip: string
  icon: React.ComponentType<SvgIconProps>
  onClick: () => void
}

interface Props {
  title: string
  action?: Action
  children?: ReactNode
}

export default function(props: Props) {
  const {title, action, children} = props
  const {loading} = useContext(AsyncContext)
  const classes = useStyles()

  return (
    <Fragment>
      <Typography variant="h5" component="h2" className={classes.title}>
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

      <Grid container spacing={16}>
        {children}
      </Grid>
    </Fragment>
  )
}
