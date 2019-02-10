import React, {useContext} from 'react'
import Grid from '@material-ui/core/Grid'
import TextField, {TextFieldProps} from '@material-ui/core/TextField'

import User from '../../../models/User'
import AsyncContext from '../../../contexts/async'

type Props = TextFieldProps & {
  name: keyof User
  label: string
  autoSelect?: boolean
  optional?: boolean
}

export default function(props: Props) {
  const {name, label, autoSelect, optional, ...inputProps} = props
  const {loading} = useContext(AsyncContext)

  function selectText(event: React.FocusEvent<HTMLInputElement>) {
    event.currentTarget.select()
  }

  const withAutoSelect = autoSelect
    ? {onFocus: selectText, autoFocus: true}
    : {}

  return (
    <Grid item xs={6} md={4} lg={3}>
      <TextField
        disabled={loading}
        {...inputProps}
        {...withAutoSelect}
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
