import React, {useContext} from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import {OutlinedTextFieldProps} from '@material-ui/core/TextField'

import AsyncContext from '../../../contexts/async'

export type TextFieldProps<T> = Partial<OutlinedTextFieldProps> & {
  name: string & keyof T
  label: string
  defaultValue?: any
  optional?: boolean
}

export default function<T>(props: TextFieldProps<T>) {
  const {name, label, optional, ...inputProps} = props
  const {loading} = useContext(AsyncContext)

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <TextField
        disabled={loading}
        {...inputProps}
        required={!optional}
        name={name}
        id={name}
        label={label}
        fullWidth
        variant="outlined"
      />
    </Grid>
  )
}
