import React, {Fragment, useEffect, useRef, useState} from 'react'
import _ from 'lodash/fp'

import * as $document from '../../document/service'
import {DocumentItem} from '../../document/item/model'
import {getClientName} from '../../client/model'
import {RateUnit} from '../../user/model'
import useDocumentContext from '../../document/context'
import useUserContext from '../../user/context'
import useClientContext from '../../client/context'
import useForm from '../../common/form'
import Section from '../../common/form/Section'
import Submit from '../../common/form/Submit'
import EditItem from '../../document/item/components/Edit'
import ListItem from '../../document/item/components/List'

import {Quotation, emptyQuotation} from '../model'

type Props = {
  quotation?: Quotation
}

export default function(props: Props) {
  const [user] = useUserContext()
  const [clients] = useClientContext()
  const {documents, dispatch, download} = useDocumentContext()

  const quotation = useRef(props.quotation || emptyQuotation(user))
  const [rate, setLocalRate] = useState(quotation.current.rate)
  const [taxRate, setLocalTaxRate] = useState(quotation.current.taxRate)
  const [items, setItems] = useState(quotation.current.items)
  const [total, setTotal] = useState(quotation.current.total)
  const form = useForm(quotation.current)
  const {Form, TextField, DateField, Select, submit} = form

  useEffect(() => {
    setLocalRate(quotation.current.rate)
    setLocalTaxRate(quotation.current.taxRate)
    setItems(quotation.current.items)
    setTotal(quotation.current.total)
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

  function setRate(value: string | number | null | undefined) {
    setLocalRate(_.isNil(value) ? null : Number(value))
  }

  async function saveDocument(quotation: Quotation) {
    quotation.items = items
    quotation.total = total

    if (quotation.id === -1) {
      await $document.create(quotation)
      return dispatch({type: 'create', document: quotation})
    }

    if (quotation.status === 'pending') {
      quotation.pdf = await download(quotation)
    }

    await $document.update(quotation)
    dispatch({type: 'update', document: quotation})
  }

  if (_.isNull(user)) return null
  if (_.isNull(clients)) return null
  if (_.isNull(documents) && !_.isNil(props.quotation)) return null

  function renderRate(unit: RateUnit) {
    switch (unit) {
      case RateUnit.hour:
        return 'Par heure'

      case RateUnit.day:
        return 'Par jour'

      case RateUnit.service:
        return 'Par prestation'
    }
  }

  return (
    <Fragment>
      <Form
        onSubmit={saveDocument}
        onSuccess={{
          message: 'Devis enregistré',
          goTo: ['document', {type: 'quotation'}],
        }}
        onError={{message: 'Erreur : échec enregistrement devis'}}
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
              label="TVA (%)"
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

        <Section title="Tarification">
          <TextField
            name="rate"
            label="Tarif (€)"
            type="number"
            required={false}
            onChange={setRate}
          />
          <Select name="rateUnit" label="Unité" required={false}>
            {_.keys(RateUnit)
              .filter(unit => !isNaN(Number(unit)))
              .map(unit => (
                <option key={unit} value={unit}>
                  {renderRate(Number(unit))}
                </option>
              ))}
          </Select>
        </Section>

        <Section title="Dates">
          <DateField name="expiresAt" label="Expiration de l'offre" />
          <DateField name="startsAt" label="Date de début" />
          <DateField name="endsAt" label="Date de fin" />
        </Section>
      </Form>

      <EditItem rate={rate} onAdd={addItem} />

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
