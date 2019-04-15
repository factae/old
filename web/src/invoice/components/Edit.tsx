import React, {Fragment, useEffect, useRef, useState} from 'react'
import _ from 'lodash/fp'

import * as $document from '../../document/service'
import {DocumentItem} from '../../document/item/model'
import {getClientName} from '../../client/model'
import useDocumentContext from '../../document/context'
import useUserContext from '../../user/context'
import useClientContext from '../../client/context'
import useForm from '../../common/form'
import Section from '../../common/form/Section'
import Submit from '../../common/form/Submit'
import EditItem from '../../document/item/components/Edit'
import ListItem from '../../document/item/components/List'

import {Invoice, emptyInvoice} from '../model'

type Props = {
  invoice?: Invoice
}

export default function(props: Props) {
  const [user] = useUserContext()
  const [clients] = useClientContext()
  const {documents, dispatch, download} = useDocumentContext()

  const invoice = useRef(props.invoice || emptyInvoice(user))
  const [taxRate, setLocalTaxRate] = useState(invoice.current.taxRate)
  const [items, setItems] = useState(invoice.current.items)
  const [total, setTotal] = useState(invoice.current.total)
  const {Form, TextField, Select, submit} = useForm(invoice.current)

  useEffect(() => {
    setLocalTaxRate(invoice.current.taxRate)
    setItems(invoice.current.items)
    setTotal(invoice.current.total)
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

  async function saveInvoice(invoice: Invoice) {
    invoice.items = items
    invoice.total = total

    if (invoice.id === -1) {
      await $document.create(invoice)
      return dispatch({type: 'create', document: invoice})
    }

    if (invoice.status === 'pending') {
      await $document.update(invoice)
      invoice.pdf = await download(invoice)
    }

    await $document.update(invoice)
    dispatch({type: 'update', document: invoice})
  }

  if (_.isNull(user)) return null
  if (_.isNull(clients)) return null
  if (_.isNull(documents) && !_.isNil(props.invoice)) return null

  return (
    <Fragment>
      <Form
        onSubmit={saveInvoice}
        onSuccess={{
          message: 'Facture enregistrée',
          goTo: ['document', {type: 'invoice'}],
        }}
        onError={{message: 'Erreur : échec enregistrement facture'}}
      >
        <Section title="Informations générales">
          <Select name="clientId" label="Client" autoFocus>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {getClientName(client)}
              </option>
            ))}
          </Select>

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
