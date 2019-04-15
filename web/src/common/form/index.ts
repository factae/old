import {FunctionComponent, useEffect, useState} from 'react'

import useForm, {FormProps} from './Form'
import useTextField, {TextFieldProps} from './TextField'
import useDateField, {DateFieldProps} from './DateField'
import useSelect, {SelectProps} from './Select'
import useSwitch, {SwitchProps} from './Switch'

export type FormComponents<T> = {
  Form: FunctionComponent<FormProps<T>>
  TextField: FunctionComponent<TextFieldProps<T>>
  DateField: FunctionComponent<DateFieldProps<T>>
  Select: FunctionComponent<SelectProps<T>>
  Switch: FunctionComponent<SwitchProps<T>>
  submit: () => void
}

export default function<T>(defaultModel: T | null) {
  const {FormContext, Form, submit} = useForm<T>(defaultModel)
  const TextField = useTextField<T>(FormContext)
  const DateField = useDateField<T>(FormContext)
  const Select = useSelect<T>(FormContext)
  const Switch = useSwitch<T>(FormContext)

  const defaultComponents: FormComponents<T> = {
    Form,
    TextField,
    DateField,
    Select,
    Switch,
    submit,
  }

  const [components, setComponents] = useState(defaultComponents)

  useEffect(() => {
    setComponents(defaultComponents)
  }, [defaultModel])

  return components
}
