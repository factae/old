import React, {useContext, useEffect, useState} from 'react'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import noop from 'lodash/noop'
import omit from 'lodash/omit'
import Grid, {GridProps} from '@material-ui/core/Grid'
import MuiTextField from '@material-ui/core/TextField'
import {TextFieldProps as MuiTextFieldProps} from '@material-ui/core/TextField'
import {FilledInputProps} from '@material-ui/core/FilledInput'

import FormContext from './Context'
import useDebounce from '../../common/hooks/debounce'
import AsyncContext from '../../common/contexts/async'

type TextFieldAttributes = 'autoFocus' | 'disabled' | 'type' | 'required'

export type TextFieldProps<T> = Pick<MuiTextFieldProps, TextFieldAttributes> & {
  name: string & keyof T
  label: string
  onChange?: (value: string) => void
  grid?: GridProps
  inputProps?: FilledInputProps['inputProps']
}

export default function<T>(context: React.Context<FormContext<T>>) {
  return function TextField(props: TextFieldProps<T>) {
    const debounce = useDebounce()
    const {loading} = useContext(AsyncContext)
    const {name: key, label, required} = props
    const handleChangeParent = debounce(props.onChange || noop)
    const grid = props.grid || {xs: 12, sm: 6, md: 4, lg: 3}

    const [defaultModel, setModelPart] = useContext(context)
    const defaultValue = get(defaultModel, key, null)
    const [value, setValue] = useState<string | null>(defaultValue)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const nextValue = event.currentTarget.value || null
      setValue(nextValue)

      if (!isNil(defaultModel)) {
        setModelPart(key, nextValue)
        handleChangeParent(nextValue)
      }
    }

    useEffect(() => {
      setValue(defaultValue)
    }, [defaultModel])

    return (
      <Grid item {...grid}>
        <MuiTextField
          disabled={loading}
          fullWidth
          {...omit(props, 'name', 'label', 'grid', 'onChange')}
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
}
