import React, {Fragment} from 'react'
import {useMemo, useContext, useEffect, useRef, useState} from 'react'
import find from 'lodash/find'
import isNaN from 'lodash/isNaN'
import isNil from 'lodash/isNil'
import isObject from 'lodash/isObject'
import keys from 'lodash/keys'
import IconSave from '@material-ui/icons/Save'

import * as service from '../service'
import {Invoice, emptyInvoice} from '../../invoice/model'
import {ContractItem} from '../../contractItem/model'
import {RateUnit} from '../../user/model'
import useRouting from '../../common/hooks/routing'
import InvoiceContext from '../context'
import UserContext from '../../user/context'
import useForm from '../../common/form'
import Header from '../../common/form/Header'
import Section from '../../common/form/Section'
import ClientContext from '../../client/context'
import EditItem from '../../contractItem/components/Edit'
import ListItem from '../../contractItem/components/List'

export default function() {
  const [user] = useContext(UserContext)
  const [clients] = useContext(ClientContext)
  const [invoices, dispatch] = useContext(InvoiceContext)

  const {match, location} = useRouting()
  const id = isNil(match.params.id) ? -1 : Number(match.params.id)

  const getDefaultInvoice = useMemo((): Invoice => {
    const {state} = location
    console.log(state)
    if (isObject(state)) return state

    const invoice = find(invoices, {id})
    if (!isNil(invoice)) return invoice

    return emptyInvoice({user})
  }, [invoices])

  const invoice = useRef(getDefaultInvoice)
  const [rate, setLocalRate] = useState(invoice.current.rate)
  const [taxRate, setLocalTaxRate] = useState(invoice.current.taxRate)
  const [items, setItems] = useState(invoice.current.items)
  const [total, setTotal] = useState(invoice.current.total)
  const {Form, TextField, DateField, Select} = useForm(invoice.current)

  useEffect(() => {
    invoice.current = getDefaultInvoice

    setLocalRate(invoice.current.rate)
    setLocalTaxRate(invoice.current.taxRate)
    setItems(invoice.current.items)
    setTotal(invoice.current.total)
  }, [invoices])

  function addItem(item: ContractItem) {
    setItems([...items, item])
    setTotal(total + item.total)
  }

  function setTaxRate(value: string | number | null | undefined) {
    setLocalTaxRate(isNil(value) ? null : Number(value))
  }

  function setRate(value: string | number | null | undefined) {
    setLocalRate(isNil(value) ? null : Number(value))
  }

  async function saveInvoice(invoice: Invoice) {
    invoice.items = items
    invoice.total = total

    if (id === -1) {
      await service.create(invoice)
      dispatch({type: 'create', invoice})
    } else {
      await service.update(invoice)
      dispatch({type: 'update', invoice})
    }
  }

  if (isNil(user)) return null
  if (isNil(clients)) return null
  if (isNil(invoices) && id > -1) return null

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
      <Form main onSubmit={saveInvoice}>
        <Header
          title={id === -1 ? 'Créer une facture' : 'Modifier une facture'}
          label="Sauvegarder"
          icon={IconSave}
        />

        <Section title="Informations générales">
          <Select name="clientId" label="Client" autoFocus>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.firstName} {client.lastName}
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

          <DateField name="startsAt" label="Date de début" />
          <DateField name="endsAt" label="Date de fin" />
          <TextField
            name="rate"
            label="Tarif"
            type="number"
            required={false}
            onChange={setRate}
          />
          <Select name="rateUnit" label="Unité de tarif" required={false}>
            {keys(RateUnit)
              .filter(unit => !isNaN(Number(unit)))
              .map(unit => (
                <option key={unit} value={unit}>
                  {renderRate(Number(unit))}
                </option>
              ))}
          </Select>
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

      <EditItem rate={rate} onAdd={addItem} />
      <ListItem items={items} total={total} taxRate={taxRate} />
    </Fragment>
  )
}
