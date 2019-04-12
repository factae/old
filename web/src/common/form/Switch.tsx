import React, {ChangeEvent, Context} from 'react'
import {useContext, useEffect, useState} from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid, {GridProps} from '@material-ui/core/Grid'
import MuiSwitch from '@material-ui/core/Switch'
import {SwitchProps as AllMuiSwitchProps} from '@material-ui/core/Switch'
import _ from 'lodash/fp'

import FormContext from './Context'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

type SwitchValue = boolean | null
type MuiSwitchProps = Omit<AllMuiSwitchProps, 'name' | 'value' | 'onChange'>

export type SwitchProps<T> = Partial<MuiSwitchProps> & {
  name: string & keyof T
  label: string
  value?: SwitchValue
  onChange?: (value: SwitchValue) => void | boolean
  grid?: GridProps
}

export default function<T>(context: Context<FormContext<T>>) {
  return function Switch(props: SwitchProps<T>) {
    const key = props.name
    const grid = props.grid || {xs: 12, sm: 6, md: 4, lg: 3}

    const broadcastChange = props.onChange || _.noop
    const [model, updateModel] = useContext(context)
    const modelValue = parseValue(_.get(key, model))
    const [value, setValue] = useState<SwitchValue>(modelValue)

    function parseValue(value: any): SwitchValue {
      if (_.isNull(value)) return null
      return Boolean(value)
    }

    function setRowValue(rawValue: any) {
      const nextValue = parseValue(rawValue)

      if (!_.isNull(model)) {
        if (broadcastChange(nextValue) === false) return
        updateModel(key, nextValue)
      }

      setValue(nextValue)
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      return setRowValue(event.currentTarget.checked)
    }

    useEffect(() => {
      setValue(modelValue)
    }, [modelValue])

    return (
      <Grid item {...grid}>
        <FormControlLabel
          label={props.label}
          control={
            <MuiSwitch
              color="primary"
              name={key}
              checked={Boolean(value)}
              onChange={handleChange}
            />
          }
        />
      </Grid>
    )
  }
}
