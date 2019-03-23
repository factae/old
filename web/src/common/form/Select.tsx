import React, {useContext, useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import get from 'lodash/get'
import uuid from 'uuid/v4'
import isNil from 'lodash/isNil'
import isNumber from 'lodash/isNumber'
import noop from 'lodash/noop'
import omit from 'lodash/omit'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MuiSelect from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import {SelectProps as MuiSelectProps} from '@material-ui/core/Select'

import AsyncContext from '../../common/contexts/async'
import FormContext from './Context'

type SelectAttributes = 'autoFocus' | 'disabled' | 'type' | 'required'
export type SelectProps<T> = Pick<MuiSelectProps, SelectAttributes> & {
  name: string & keyof T
  label: string
  onChange?: (value: number) => void
  children: any
}

export default function<T>(context: React.Context<FormContext<T>>) {
  return function Select(props: SelectProps<T>) {
    const id = uuid()
    const {name: key, label, disabled, required} = props
    const handleChangeParent = props.onChange || noop
    const {loading} = useContext(AsyncContext)
    const labelRef = useRef<InputLabel>(null)

    const [defaultModel, setModelPart] = useContext(context)
    const defaultValue = Number(get(defaultModel, key, null))
    const [value, setValue] = useState(defaultValue)

    useEffect(() => {
      setValue(defaultValue)
    }, [defaultModel])

    function labelWidth() {
      if (value <= 0) return 0
      if (!labelRef.current) return 0

      const labelNode = ReactDOM.findDOMNode(labelRef.current)
      return (labelNode as HTMLLabelElement).offsetWidth
    }

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
      const nextValue = Number(event.target.value)
      setValue(nextValue)

      if (!isNil(defaultModel)) {
        setModelPart(key, nextValue)
        handleChangeParent(key, nextValue)
      }
    }

    function renderInput() {
      return <OutlinedInput id={id} name={key} labelWidth={labelWidth()} />
    }

    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl
          variant="outlined"
          fullWidth
          disabled={loading || disabled}
          required={required !== false}
        >
          <InputLabel shrink={value > 0} ref={labelRef} htmlFor={id}>
            {label}
          </InputLabel>
          <MuiSelect
            {...omit(props, 'name', 'label', 'onChange')}
            native
            input={renderInput()}
            value={value}
            onChange={handleChange}
          >
            <option />
            {props.children}
          </MuiSelect>
        </FormControl>
      </Grid>
    )
  }
}
