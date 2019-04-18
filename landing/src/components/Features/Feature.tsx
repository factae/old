import React, {ReactNode} from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconLi from '@material-ui/icons/Adjust'

import {useStyles} from './styles'

type Props = {
  children: ReactNode
}

export default function({children}: Props) {
  const classes = useStyles()

  return (
    <Grid className={classes.feature} item xs={12} sm={6} md={4}>
      <Typography className={classes.text} component="h4" variant="body1">
        <IconLi className={classes.icon} /> {children}
      </Typography>
    </Grid>
  )
}
