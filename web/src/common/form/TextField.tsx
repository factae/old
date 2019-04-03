import React, {useContext, useEffect, useState} from 'react'
import useDebounce from 'react-captain/useDebounce'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import isNumber from 'lodash/isNumber'
import noop from 'lodash/noop'
import omit from 'lodash/omit'
import Grid, {GridProps} from '@material-ui/core/Grid'
import MuiTextField from '@material-ui/core/TextField'
import {TextFieldProps as AllMuiTextFieldProps} from '@material-ui/core/TextField'

import FormContext from './Context'
import AsyncContext from '../../common/contexts/async'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

type TextFieldValue = string | number | null | undefined
type MuiTextFieldProps = Omit<
  AllMuiTextFieldProps,
  'name' | 'value' | 'onChange'
>

export type TextFieldProps<T> = Partial<MuiTextFieldProps> & {
  name: string & keyof T
  value?: TextFieldValue
  onChange?: (value: TextFieldValue) => void
  grid?: GridProps
}

export default function<T>(context: React.Context<FormContext<T>>) {
  return function TextField(props: TextFieldProps<T>) {
    const debounce = useDebounce({persist: true})
    const {loading} = useContext(AsyncContext)
    const {name: key, label, required} = props
    const handleChangeParent = debounce(props.onChange || noop)
    const grid = props.grid || {xs: 12, sm: 6, md: 4, lg: 3}

    const [model, setModelPart] = useContext(context)
    const modelValue = get(model, key, null)
    const overrideValue = props.value

    const [value, setValue] = useState<TextFieldValue>(modelValue)

    function parseValue(value: TextFieldValue): TextFieldValue {
      if (isNil(value) || isNumber(value)) return value

      if (isEmpty(value.trim())) return null
      else if (props.type === 'number') return Number(value)
      else return value
    }

    function setRowValue(rowValue: TextFieldValue) {
      const nextValue = parseValue(rowValue)
      setValue(nextValue)

      if (!isNil(model)) {
        setModelPart(key, nextValue)
        handleChangeParent(nextValue)
      }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      return setRowValue(event.currentTarget.value)
    }

    useEffect(() => {
      setValue(modelValue)
    }, [modelValue])

    useEffect(() => {
      if (!isNil(overrideValue)) {
        setRowValue(overrideValue)
      }
    }, [overrideValue])

    return (
      <Grid item {...grid}>
        <MuiTextField
          inputProps={{step: 0.01}}
          disabled={loading}
          fullWidth
          {...omit(props, 'name', 'label', 'grid', 'onChange')}
          required={isNil(required) ? true : required}
          onChange={handleChange}
          value={isNil(value) ? '' : String(value)}
          name={key}
          label={label}
          variant="outlined"
        />
      </Grid>
    )
  }
}
