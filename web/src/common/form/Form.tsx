import React, {createContext, useContext, useEffect, useState} from 'react'
import {ReactNode} from 'react'
import assign from 'lodash/assign'
import isNull from 'lodash/isNull'
import noop from 'lodash/noop'
import {DateTime} from 'luxon'

import Context from './Context'
import AsyncContext from '../../common/contexts/async'
import useRouting from '../../common/hooks/routing'
import useDebounce from '../../common/hooks/debounce'

export type FormProps<T> = {
  onChange?: (model: T) => void
  onSubmit?: (model: T) => void
  main?: boolean
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
    const submit = props.onSubmit || noop
    const debounce = useDebounce()
    const sendChanges = debounce(props.onChange || noop)
    const {goBack} = useRouting()
    const async = useContext(AsyncContext)
    const [model, setModel] = useState<T | null>(defaultModel)

    function setModelPart(
      key: keyof T,
      value: string | number | DateTime | null,
    ) {
      if (!isNull(model)) {
        const nextModel: T = assign(model, {[key]: value})
        setModel(nextModel)
        sendChanges(nextModel)
      }
    }

    async function handleSubmit(event: FormEvent) {
      event.preventDefault()

      if (isNull(model)) {
        return
      }

      if (!props.main) {
        await submit(model)
        return setModel(defaultModel)
      }

      async.start()

      try {
        await submit(model)
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
