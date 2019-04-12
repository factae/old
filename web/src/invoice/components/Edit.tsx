import React, {Fragment, useMemo, useEffect, useRef, useState} from 'react'
import _ from 'lodash/fp'
import IconSave from '@material-ui/icons/Save'

import * as service from '../service'
import {Invoice, emptyInvoice} from '../../invoice/model'
import {ContractItem} from '../../contractItem/model'
import useRouting from '../../common/hooks/routing'
import useInvoiceContext from '../context'
import useUserContext from '../../user/context'
import useClientContext from '../../client/context'
import useForm from '../../common/form'
import Header from '../../common/form/Header'
import Section from '../../common/form/Section'
import Submit from '../../common/form/Submit'
import EditItem from '../../contractItem/components/Edit'
import ListItem from '../../contractItem/components/List'

export default function() {
  const [user] = useUserContext()
  const [clients] = useClientContext()
  const {invoices, dispatch, download} = useInvoiceContext()

  const {goTo, match, location} = useRouting<{id: number}>()
  const id = _.isNil(match.params.id) ? -1 : Number(match.params.id)

  const defaultInvoice = useMemo((): Invoice => {
    const {state} = location
    if (_.isObject(state)) return state

    const invoice = _.find<Invoice>({id})(invoices)
    if (!_.isNil(invoice)) return invoice

    return emptyInvoice(user)
  }, [invoices])

  const invoice = useRef(defaultInvoice)
  const [taxRate, setLocalTaxRate] = useState(invoice.current.taxRate)
  const [items, setItems] = useState(invoice.current.items)
  const [total, setTotal] = useState(invoice.current.total)
  const {Form, TextField, Select} = useForm(invoice.current)
  const submitRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    invoice.current = defaultInvoice

    setLocalTaxRate(invoice.current.taxRate)
    setItems(invoice.current.items)
    setTotal(invoice.current.total)
  }, [invoices])

  function addItem(item: ContractItem) {
    setItems([...items, item])
    setTotal(total + (item.total || 0))
  }

  function setTaxRate(value: string | number | null | undefined) {
    setLocalTaxRate(_.isNil(value) ? null : Number(value))
  }

  function submitForm() {
    if (submitRef.current) {
      submitRef.current.click()
    }
  }

  async function saveInvoice(invoice: Invoice) {
    invoice.items = items
    invoice.total = total

    if (id === -1) {
      await service.create(invoice)
      return dispatch({type: 'create', invoice})
    }

    if (invoice.status === 'pending') {
      invoice.pdf = await download(invoice)
    }

    await service.update(invoice)
    dispatch({type: 'update', invoice})
  }

  if (_.isNil(user)) return null
  if (_.isNil(clients)) return null
  if (_.isNil(invoices) && id > -1) return null

  return (
    <Fragment>
      <Form
        onSubmit={saveInvoice}
        onSuccess={{message: 'Facture enregistrée.', goTo: 'invoice'}}
        onError={{message: "Erreur lors de l'enregistrement de la facture !"}}
      >
        <Header
          title={id === -1 ? 'Créer une facture' : 'Modifier une facture'}
          onBack={() => goTo('invoice')}
          action={{
            ref: ref => (submitRef.current = ref),
            label: 'Sauvegarder',
            icon: IconSave,
          }}
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
      <ListItem items={items} taxRate={taxRate} total={total} />

      <Submit onClick={submitForm} />
    </Fragment>
  )
}
