import React, {Fragment, useContext, useEffect, useRef, useState} from 'react'
import find from 'lodash/find'
import isNil from 'lodash/isNil'
import isNull from 'lodash/isNull'
import keys from 'lodash/keys'
import IconSave from '@material-ui/icons/Save'

import * as service from '../service'
import {Invoice, emptyInvoice} from '../../invoice/model'
import {ContractItem, emptyItem} from '../../contractItem/model'
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
  const [clients] = useContext(ClientContext)
  const [invoices, dispatch] = useContext(InvoiceContext)
  const [user] = useContext(UserContext)

  const {match} = useRouting()
  const id = isNil(match.params.id) ? -1 : Number(match.params.id)
  const invoice = useRef(find(invoices, {id}) || emptyInvoice({user}))
  const {Form, TextField, DateField, Select} = useForm(invoice.current)

  const [rate, setRate] = useState(invoice.current.rate)
  const [items, setItems] = useState([emptyItem(invoice.current.rate)])
  const [total, setTotal] = useState(0)
  const [taxRate, setLocalTaxRate] = useState(invoice.current.taxRate)

  useEffect(() => {
    setItems(invoice.current.items)
    setLocalTaxRate(invoice.current.taxRate)
    setTotal(invoice.current.total)
  }, [invoices])

  useEffect(() => {
    setRate(invoice.current.rate)
  }, [invoice.current.rate])

  function addItem(item: ContractItem) {
    setItems([...items, item])
    setTotal(total + item.total)
  }

  async function saveInvoice(invoice: Invoice) {
    invoice.total = total
    invoice.items = items

    if (id === -1) {
      await service.create(invoice)
      dispatch({type: 'create', invoice})
    } else {
      await service.update(invoice)
      dispatch({type: 'update', invoice})
    }
  }

  function setTaxRate(value: string) {
    setLocalTaxRate(Number(value))
  }

  if ((id > -1 && isNull(invoices)) || isNull(clients) || isNull(user)) {
    return null
  }

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
            onChange={nextRate => setRate(Number(nextRate))}
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
