import {Dispatch, createContext, useContext} from 'react'
import _ from 'lodash/fp'

import {Document} from './model'

type ActionCreate = {
  type: 'create'
  document: Document
}

type ActionUpdate = {
  type: 'update'
  document: Document
}

type ActionUpdateAll = {
  type: 'update-all'
  documents: Document[]
}

type ActionDelete = {
  type: 'delete'
  id: number
}

export type Action =
  | ActionCreate
  | ActionUpdate
  | ActionUpdateAll
  | ActionDelete

export type State = Document[] | null

type Context = {
  documents: State
  dispatch: Dispatch<Action>
  download: (document: Document) => Promise<string>
}

const defaultContext: Context = {
  documents: null,
  dispatch: _.noop,
  download: () => Promise.resolve(''),
}

export const DocumentContext = createContext(defaultContext)

export default function() {
  return useContext(DocumentContext)
}
