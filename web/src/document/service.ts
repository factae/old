import _ from 'lodash/fp'

import * as axios from '../common/utils/axios'
import {Document} from './model'

// ---------------------------------------------------------------- # Read all #

export async function readAll(): Promise<Document[]> {
  const res = await axios.get('/document')

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  return res.data
}

// ------------------------------------------------------------------ # Create #

export async function create(document: Document) {
  const res = await axios.post('/document', _.omit('id', document))

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  document.id = res.data.id
  document.items = res.data.items

  return document
}

// ------------------------------------------------------------------ # Update #

export async function update(document: Document) {
  const res = await axios.put('/document', document)

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  document.number = res.data.number
  document.createdAt = res.data.createdAt
  document.items = res.data.items

  return document
}

// ------------------------------------------------------------------ # Delete #

export {_delete as delete}
async function _delete(documentId: number) {
  const res = await axios.delete(`/document/${documentId}`)

  if (res.status !== 204) {
    throw new Error(res.statusText)
  }
}
