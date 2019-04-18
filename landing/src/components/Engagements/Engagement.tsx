import React, {ComponentType, ReactNode} from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {SvgIconProps} from '@material-ui/core/SvgIcon'
import Typography from '@material-ui/core/Typography'

import {useStyles} from './styles'

type Props = {
  title: string
  subtitle: ReactNode
  icon: ComponentType<SvgIconProps>
}

export default function({title, subtitle, icon: Icon}: Props) {
  const classes = useStyles()

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper className={classes.paper}>
        <Typography className={classes.subtitle} component="h3" variant="h5">
          <Icon className={classes.icon} /> {title}
        </Typography>
        <Typography className={classes.desc} component="h4" variant="body1">
          {subtitle}
        </Typography>
      </Paper>
    </Grid>
  )
}
