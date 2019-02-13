import React, {createContext, useEffect, useState} from 'react'
import {ReactNode} from 'react'
import assign from 'lodash/assign'
import isNull from 'lodash/isNull'
import noop from 'lodash/noop'

export type FormProps<T> = {
  onSubmit: (model: T) => void
  children?: ReactNode
}

type Context<T> = [T | null, (k: keyof T, v: string) => void]
type FormEvent = React.FormEvent<HTMLFormElement>

export default function<T>(defaultModel: T | null) {
  const defaultContext = createContext<Context<T>>([defaultModel, noop])
  const [FormContext, setFormContext] = useState(defaultContext)

  useEffect(() => {
    setFormContext(defaultContext)
  }, [defaultModel])

  function Form(props: FormProps<T>) {
    const [model, setModel] = useState<T | null>(defaultModel)

    function setModelPart(key: keyof T, value: string) {
      if (!isNull(model)) {
        setModel(assign(model, {[key]: value}))
      }
    }

    function handleSubmit(event: FormEvent) {
      event.preventDefault()

      if (!isNull(model)) {
        props.onSubmit(model)
      }
    }

    return (
      <FormContext.Provider value={[defaultModel, setModelPart]}>
        <form onSubmit={handleSubmit}>{props.children}</form>
      </FormContext.Provider>
    )
  }

  return {FormContext, Form}
}
