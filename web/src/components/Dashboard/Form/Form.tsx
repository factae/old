import React, {createContext, useContext, useEffect, useState} from 'react'
import {ReactNode} from 'react'
import assign from 'lodash/assign'
import isNull from 'lodash/isNull'
import noop from 'lodash/noop'

import Context from './Context'
import AsyncContext from '../../../contexts/async'
import useRouting from '../../../hooks/routing'

export type FormProps<T> = {
  onSubmit: (model: T) => void
  children?: ReactNode
}

type FormEvent = React.FormEvent<HTMLFormElement>

export default function<T>(defaultModel: T | null) {
  const defaultContext = createContext<Context<T>>([defaultModel, noop])
  const [FormContext, setFormContext] = useState(defaultContext)

  useEffect(() => {
    setFormContext(defaultContext)
  }, [defaultModel])

  function Form(props: FormProps<T>) {
    const {goBack} = useRouting()
    const async = useContext(AsyncContext)
    const [model, setModel] = useState<T | null>(defaultModel)

    function setModelPart(key: keyof T, value: string | null) {
      if (!isNull(model)) {
        setModel(assign(model, {[key]: value}))
      }
    }

    async function handleSubmit(event: FormEvent) {
      event.preventDefault()

      if (isNull(model)) {
        return
      }

      async.start()

      try {
        await props.onSubmit(model)
      } catch (error) {
        console.error(error.message)
        async.stop('error-submit-form')
      }

      async.stop('success-submit-form')
      goBack()
    }

    return (
      <FormContext.Provider value={[defaultModel, setModelPart]}>
        <form onSubmit={handleSubmit}>{props.children}</form>
      </FormContext.Provider>
    )
  }

  return {FormContext, Form}
}
