import React, {Fragment, ReactNode} from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import {useStyles} from './styles'

interface Props {
  title: string
  children?: ReactNode
}

export default function(props: Props) {
  const classes = useStyles()

  return (
    <Fragment>
      <Typography variant="h5" component="h2" className={classes.subTitle}>
        {props.title}
      </Typography>

      <Grid container spacing={16}>
        {props.children}
      </Grid>
    </Fragment>
  )
}
