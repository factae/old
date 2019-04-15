import React, {Fragment, useEffect, useRef, useState} from 'react'
import _ from 'lodash/fp'

import * as $document from '../../document/service'
import {getClientName} from '../../client/model'
import {DocumentItem} from '../../document/item/model'
import useDocumentContext from '../../document/context'
import useUserContext from '../../user/context'
import useClientContext from '../../client/context'
import useForm from '../../common/form'
import Section from '../../common/form/Section'
import Submit from '../../common/form/Submit'
import EditItem from '../../document/item/components/Edit'
import ListItem from '../../document/item/components/List'

import {Credit, emptyCredit} from '../model'

type Props = {
  credit?: Credit
}

export default function(props: Props) {
  const [user] = useUserContext()
  const [clients] = useClientContext()
  const {documents, dispatch, download} = useDocumentContext()

  const credit = useRef(props.credit || emptyCredit(user))
  const [taxRate, setLocalTaxRate] = useState(credit.current.taxRate)
  const [items, setItems] = useState(credit.current.items)
  const [total, setTotal] = useState(credit.current.total)
  const {Form, TextField, Select, submit} = useForm(credit.current)

  useEffect(() => {
    setLocalTaxRate(credit.current.taxRate)
    setItems(credit.current.items)
    setTotal(credit.current.total)
  }, [documents])

  function addItem(item: DocumentItem) {
    setItems([...items, {...item, position: items.length}])
    setTotal(total + (item.total || 0))
  }

  function deleteItem(index: number) {
    const item = items[index]
    setItems(_.reject(item, items))
    setTotal(total - (item.total || 0))
  }

  function setTaxRate(value: string | number | null | undefined) {
    setLocalTaxRate(_.isNil(value) ? null : Number(value))
  }

  async function saveCredit(credit: Credit) {
    credit.items = items
    credit.total = total

    if (credit.id === -1) {
      await $document.create(credit)
      return dispatch({type: 'create', document: credit})
    }

    if (credit.status === 'pending') {
      credit.pdf = await download(credit)
    }

    await $document.update(credit)
    dispatch({type: 'update', document: credit})
  }

  if (_.isNull(user)) return null
  if (_.isNull(clients)) return null
  if (_.isNull(documents) && !_.isNil(props.credit)) return null

  return (
    <Fragment>
      <Form
        onSubmit={saveCredit}
        onSuccess={{
          message: 'Avoir enregistré',
          goTo: ['document', {type: 'credit'}],
        }}
        onError={{message: 'Erreur : échec enregistrement avoir'}}
      >
        <Section title="Informations générales">
          <Select name="clientId" label="Client" autoFocus>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {getClientName(client)}
              </option>
            ))}
          </Select>

          <TextField name="invoiceNumber" label="N° de facture de référence" />

          {user.taxId && (
            <TextField
              name="taxRate"
              label="Taux de TVA (%)"
              type="number"
              onChange={setTaxRate}
            />
          )}

          <TextField
            grid={{xs: 12}}
            multiline
            rows={4}
            name="conditions"
            label="Conditions"
            required={false}
          />
        </Section>
      </Form>

      <EditItem rate={user.rate} onAdd={addItem} />

      <ListItem
        items={items}
        onDelete={deleteItem}
        total={total}
        taxRate={taxRate}
      />

      <Submit onClick={submit} disabled={!Boolean(items.length)} />
    </Fragment>
  )
}
