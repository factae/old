import React, {ReactNode, useEffect, useReducer} from 'react'

import {Quotation} from './model'
import {QuotationContext, State, Action} from './context'
import * as $quotation from './service'

function reducer(state: State, action: Action) {
  const quotations = state || []

  switch (action.type) {
    case 'create':
      return [...quotations, action.quotation]
    case 'update':
      return quotations.map(i =>
        i.id === action.quotation.id ? action.quotation : i,
      )
    case 'update-all':
      return action.quotations
    default:
      return state
  }
}

// ---------------------------------------------------------------- # Provider #

type Props = {
  children: ReactNode
}

export default function({children}: Props) {
  const [quotations, dispatch] = useReducer(reducer, null)

  function setQuotations(quotations: Quotation[]) {
    dispatch({type: 'update-all', quotations})
  }

  useEffect(() => {
    $quotation.readAll().then(setQuotations)
  }, [])

  return (
    <QuotationContext.Provider value={[quotations, dispatch]}>
      {children}
    </QuotationContext.Provider>
  )
}
