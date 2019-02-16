import {FunctionComponent, useEffect, useState} from 'react'

import useForm, {FormProps} from './Form'
import useTextField, {TextFieldProps} from './TextField'
import useSelect, {SelectProps} from './Select'

type Components<T> = {
  Form: FunctionComponent<FormProps<T>>
  TextField: FunctionComponent<TextFieldProps<T>>
  Select: FunctionComponent<SelectProps<T>>
}

const noop = () => null

export default function<T>(defaultModel: T | null) {
  const {FormContext, Form} = useForm<T>(defaultModel)
  const TextField = useTextField<T>(FormContext)
  const Select = useSelect<T>(FormContext)

  const [components, setComponents] = useState<Components<T>>({
    Form: noop,
    TextField: noop,
    Select: noop,
  })

  useEffect(() => {
    setComponents({Form, TextField, Select})
  }, [defaultModel])

  return components
}
