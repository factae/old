import React, {useContext, useEffect, useState} from 'react'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import noop from 'lodash/noop'
import omit from 'lodash/omit'
import {DateTime} from 'luxon'
import Grid, {GridProps} from '@material-ui/core/Grid'
import {DatePicker as MuiDateField} from 'material-ui-pickers'
import {TextFieldProps as MuiTextFieldProps} from '@material-ui/core/TextField'

import FormContext from './Context'
import useDebounce from '../../common/hooks/debounce'
import AsyncContext from '../../common/contexts/async'

type DateFieldAttributes = 'autoFocus' | 'disabled' | 'type' | 'required'

export type DateFieldProps<T> = Pick<MuiTextFieldProps, DateFieldAttributes> & {
  name: string & keyof T
  label: string
  onChange?: (value: DateTime) => void
  grid?: GridProps
}

export default function<T>(context: React.Context<FormContext<T>>) {
  return function DateField(props: DateFieldProps<T>) {
    const debounce = useDebounce()
    const {loading} = useContext(AsyncContext)
    const {name: key, label, required} = props
    const handleChangeParent = debounce(props.onChange || noop)
    const grid = props.grid || {xs: 12, sm: 6, md: 4, lg: 3}

    const [defaultModel, setModelPart] = useContext(context)
    const defaultValue = get(defaultModel, key, null)
    const [value, setValue] = useState<DateTime | null>(defaultValue)

    function handleChange(nextValue: DateTime) {
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
        <MuiDateField
          disabled={loading}
          fullWidth
          autoOk
          {...omit(props, 'name', 'label', 'grid', 'onChange')}
          required={isNil(required) ? true : required}
          onChange={handleChange}
          value={value}
          format="dd/LL/yyyy"
          cancelLabel="Annuler"
          okLabel="Valider"
          name={key}
          label={label}
          variant="outlined"
        />
      </Grid>
    )
  }
}
