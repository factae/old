import {createContext, useContext} from 'react'
import noop from 'lodash/noop'

type Context = {
  step: number
  prevStep: () => void
  nextStep: () => void
}

const defaultContext: Context = {
  step: 0,
  prevStep: noop,
  nextStep: noop,
}

export const StepperContext = createContext(defaultContext)

export default function() {
  return useContext(StepperContext)
}
