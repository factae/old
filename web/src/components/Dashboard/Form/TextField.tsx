import React, {Context, useContext, useEffect, useState} from 'react'
import get from 'lodash/get'
import isNull from 'lodash/isNull'
import noop from 'lodash/noop'
import omit from 'lodash/omit'
import Grid from '@material-ui/core/Grid'
import MuiTextField from '@material-ui/core/TextField'
import {TextFieldProps as MuiTextFieldProps} from '@material-ui/core/TextField'

import useDebounce from '../../../hooks/debounce'
import AsyncContext from '../../../contexts/async'

type TextFieldAttributes = 'autoFocus' | 'disabled' | 'type' | 'required'
export type TextFieldProps<T> = Pick<MuiTextFieldProps, TextFieldAttributes> & {
  name: string & keyof T
  label: string
  onChange?: (value: string) => void
}

type FormContext<T> = Context<[T | null, (k: keyof T, v: string) => void]>

export default function<T>(context: FormContext<T>) {
  function TextField(props: TextFieldProps<T>) {
    const debounce = useDebounce()
    const {loading} = useContext(AsyncContext)
    const {name: key, label, ...rest} = omit(props, 'onChange')
    const handleChangeParent = debounce(props.onChange || noop)

    const [defaultModel, setModelPart] = useContext(context)
    const defaultValue = get(defaultModel, key, '')
    const [value, setValue] = useState(defaultValue)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const nextValue = event.currentTarget.value
      setValue(nextValue)

      if (!isNull(defaultModel)) {
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
          onChange={handleChange}
          value={value}
          name={key}
          label={label}
          variant="outlined"
        />
      </Grid>
    )
  }

  return {TextField}
}
