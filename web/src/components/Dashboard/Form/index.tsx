import React, {FunctionComponent, ReactNode, useEffect, useState} from 'react'
import zipAll from 'lodash/fp/zipAll'
import zipObjectDeep from 'lodash/fp/zipObjectDeep'
import isNull from 'lodash/fp/isNull'

import TextField, {TextFieldProps} from './TextField'

type FieldProps<T> = TextFieldProps<T>
interface FormProps<T> {
  onSubmit: (state: T) => void
  children: ReactNode
}

interface Components<T> {
  Form: FunctionComponent<FormProps<T>>
  Field: FunctionComponent<FieldProps<T>>
}

const noop = () => null

export default function<T>(state: T | null) {
  const [components, setComponents] = useState<Components<T>>({
    Form: noop,
    Field: noop,
  })

  function Form(props: FormProps<T>) {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault()
      const formData = Array.from(new FormData(event.currentTarget))
      const [entries, values] = zipAll(formData) as [keyof T, string][]
      const nextState: unknown = zipObjectDeep(entries, values)

      return props.onSubmit(nextState as T)
    }

    return <form onSubmit={handleSubmit}>{props.children}</form>
  }

  useEffect(() => {
    function Field(props: FieldProps<T>) {
      const defaultValue = isNull(state) ? '' : state[props.name]
      return <TextField {...props} defaultValue={String(defaultValue)} />
    }

    setComponents({Form, Field})
  }, [state])

  return components
}
