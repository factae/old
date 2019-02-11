import React, {Fragment} from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import ContractItem from '../model'

interface Props {
  item: ContractItem
}

export default function(props: Props) {
  return (
    <Fragment>
      <Grid item xs={4}>
        <TextField name="toto" label="toto" fullWidth variant="outlined" />
      </Grid>
    </Fragment>
  )
}
