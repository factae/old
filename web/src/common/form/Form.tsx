import React, {createContext, useEffect, useRef, useState} from 'react'
import useDebounce from 'react-captain/useDebounce'
import classNames from 'classnames'
import {ReactNode} from 'react'
import _ from 'lodash'

import Context, {ModelValue} from './Context'
import useAsyncContext from '../../async/context'
import useRouting, {Route} from '../../common/hooks/routing'

export type FormProps<T> = {
  className?: string
  innerRef?: (ref: HTMLFormElement) => void
  children?: ReactNode
  onChange?: (model: T) => void
  onSubmit?: (model: T) => void
  onSuccess?: {
    notify?: boolean
    reset?: boolean
    message?: string
    goTo?: Route | [Route, any]
  }
  onError?: {
    notify?: boolean
    message?: string
  }
}

type FormEvent = React.FormEvent<HTMLFormElement>

export default function<T>(defaultModel: T | null) {
  const defaultContext = createContext<Context<T>>([defaultModel, _.noop])
  const [FormContext, setFormContext] = useState(defaultContext)
  const submitRef = useRef<HTMLButtonElement | null>(null)

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
    const errorMessage = _.get(props, 'onError.message', null)

    function setModelPart(key: keyof T, value: ModelValue) {
      if (_.isNull(model)) return

      const nextModel: T = _.assign(model, {[key]: value})
      setLocalModel(nextModel)
      setParentModel(nextModel)
    }

    async function handleSubmit(event: FormEvent) {
      event.preventDefault()
      if (successNotify) async.start()

      try {
        await submit(model)
        if (successReset) setLocalModel(defaultModel)
        if (successNotify) async.stop(successMessage)
        if (_.isArray(successGoTo)) goTo(successGoTo[0], successGoTo[1])
        else if (successGoTo) goTo(successGoTo)
      } catch (error) {
        const message =
          errorMessage || error.response ? error.response.data : error.message

        console.error(message)
        async.stop(`Erreur : ${message}`)
      }
    }

    return (
      <FormContext.Provider value={[defaultModel, setModelPart]}>
        <form
          className={classNames(props.className)}
          onSubmit={handleSubmit}
          ref={props.innerRef}
        >
          {props.children}
          <button type="submit" ref={submitRef} style={{display: 'none'}} />
        </form>
      </FormContext.Provider>
    )
  }

  function submit() {
    if (submitRef.current) {
      submitRef.current.click()
    }
  }

  useEffect(() => {
    setFormContext(defaultContext)
  }, [defaultModel])

  return {FormContext, Form, submit}
}
