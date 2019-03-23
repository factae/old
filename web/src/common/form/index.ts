import {FunctionComponent, useEffect, useState} from 'react'

import useForm, {FormProps} from './Form'
import useTextField, {TextFieldProps} from './TextField'
import useDateField, {DateFieldProps} from './DateField'
import useSelect, {SelectProps} from './Select'

export type FormComponents<T> = {
  Form: FunctionComponent<FormProps<T>>
  TextField: FunctionComponent<TextFieldProps<T>>
  DateField: FunctionComponent<DateFieldProps<T>>
  Select: FunctionComponent<SelectProps<T>>
}

export default function<T>(defaultModel: T | null) {
  const {FormContext, Form} = useForm<T>(defaultModel)
  const TextField = useTextField<T>(FormContext)
  const DateField = useDateField<T>(FormContext)
  const Select = useSelect<T>(FormContext)

  const defaultComponents: FormComponents<T> = {
    Form,
    TextField,
    DateField,
    Select,
  }

  const [components, setComponents] = useState(defaultComponents)

  useEffect(() => {
    setComponents(defaultComponents)
  }, [defaultModel])

  return components
}
