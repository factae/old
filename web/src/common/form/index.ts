import {FunctionComponent, useEffect, useState} from 'react'

import useForm, {FormProps} from './Form'
import useTextField, {TextFieldProps} from './TextField'

type Components<T> = {
  Form: FunctionComponent<FormProps<T>>
  TextField: FunctionComponent<TextFieldProps<T>>
}

const noop = () => null

export default function<T>(defaultModel: T | null) {
  const {FormContext, Form} = useForm<T>(defaultModel)
  const {TextField} = useTextField<T>(FormContext)

  const [components, setComponents] = useState<Components<T>>({
    Form: noop,
    TextField: noop,
  })

  useEffect(() => {
    setComponents({Form, TextField})
  }, [defaultModel])

  return components
}
