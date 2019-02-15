import React, {useContext, useEffect, useState} from 'react'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import noop from 'lodash/noop'
import omit from 'lodash/omit'
import Grid from '@material-ui/core/Grid'
import MuiTextField from '@material-ui/core/TextField'
import {TextFieldProps as MuiTextFieldProps} from '@material-ui/core/TextField'

import FormContext from './Context'
import useDebounce from '../../common/hooks/debounce'
import AsyncContext from '../../common/contexts/async'

type TextFieldAttributes = 'autoFocus' | 'disabled' | 'type' | 'required'
export type TextFieldProps<T> = Pick<MuiTextFieldProps, TextFieldAttributes> & {
  name: string & keyof T
  label: string
  onChange?: (value: string) => void
}

export default function<T>(context: React.Context<FormContext<T>>) {
  function TextField(props: TextFieldProps<T>) {
    const debounce = useDebounce()
    const {loading} = useContext(AsyncContext)
    const {name: key, label, required, ...rest} = omit(props, 'onChange')
    const handleChangeParent = debounce(props.onChange || noop)

    const [defaultModel, setModelPart] = useContext(context)
    const defaultValue = get(defaultModel, key, null)
    const [value, setValue] = useState<string | null>(defaultValue)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const nextValue = event.currentTarget.value.trim() || null
      setValue(nextValue)

      if (!isNil(defaultModel)) {
        setModelPart(key, nextValue)
        handleChangeParent(key, nextValue)
      }
    }

    useEffect(() => {
      setValue(defaultValue)
    }, [defaultModel])

    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <MuiTextField
          disabled={loading}
          fullWidth
          {...rest}
          required={isNil(required) ? true : required}
          onChange={handleChange}
          value={value || ''}
          name={key}
          label={label}
          variant="outlined"
        />
      </Grid>
    )
  }

  return {TextField}
}
