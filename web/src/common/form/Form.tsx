import React, {createContext, useEffect, useState} from 'react'
import useDebounce from 'react-captain/useDebounce'
import classNames from 'classnames'
import {ReactNode} from 'react'
import _ from 'lodash'
import {DateTime} from 'luxon'

import Context from './Context'
import useAsyncContext from '../../async/context'
import useRouting, {Route} from '../../common/hooks/routing'

export type FormProps<T> = {
  className?: string
  children?: ReactNode
  onChange?: (model: T) => void
  onSubmit?: (model: T) => void
  onSuccess?: {
    notify?: boolean
    reset?: boolean
    message?: string
    goTo?: Route
  }
  onError?: {
    notify?: boolean
    message?: string
  }
}

type FormValue = string | number | DateTime | null | undefined
type FormEvent = React.FormEvent<HTMLFormElement>

export default function<T>(defaultModel: T | null) {
  const defaultContext = createContext<Context<T>>([defaultModel, _.noop])
  const [FormContext, setFormContext] = useState(defaultContext)

  useEffect(() => {
    setFormContext(defaultContext)
  }, [defaultModel])

  function Form(props: FormProps<T>) {
    const async = useAsyncContext()
    const debounce = useDebounce()
    const {goTo} = useRouting()

    const [model, setLocalModel] = useState<T | null>(defaultModel)
    const setParentModel = debounce(props.onChange || _.noop)
    const submit = props.onSubmit || _.noop

    const successNotify = _.get(props, 'onSuccess.notify', true)
    const successMessage = _.get(props, 'onSuccess.message', 'Enregistré.')
    const successReset = _.get(props, 'onSuccess.reset', false)
    const successGoTo = _.get(props, 'onSuccess.goTo', null)
    const errorMessage = _.get(props, 'onError.message', 'Erreur')

    function setModelPart(key: keyof T, value: FormValue) {
      if (_.isNull(model)) return

      const nextModel: T = _.assign(model, {[key]: value})
      setLocalModel(nextModel)
      setParentModel(nextModel)
    }

    async function handleSubmit(event: FormEvent) {
      event.preventDefault()
      if (_.isNull(model)) return
      if (successNotify) async.start()

      try {
        await submit(model)
        if (successReset) setLocalModel(defaultModel)
        if (successNotify) async.stop(successMessage)
        if (successGoTo) goTo(successGoTo)
      } catch (error) {
        console.error(error.toString())
        async.stop(`${errorMessage} : ${error.message}`)
      }
    }

    return (
      <FormContext.Provider value={[defaultModel, setModelPart]}>
        <form className={classNames(props.className)} onSubmit={handleSubmit}>
          {props.children}
        </form>
      </FormContext.Provider>
    )
  }

  return {FormContext, Form}
}
