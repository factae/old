import React from 'react'

function createContext<T>(model: T | null) {
  return React.createContext(model)
}

const context = createContext(null)
export default context
