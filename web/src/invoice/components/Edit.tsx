import React, {Fragment} from 'react'
import {useMemo, useContext, useEffect, useRef, useState} from 'react'
import _ from 'lodash/fp'
import IconSave from '@material-ui/icons/Save'

import * as service from '../service'
import {Invoice, emptyInvoice} from '../../invoice/model'
import {ContractItem} from '../../contractItem/model'
import useRouting from '../../common/hooks/routing'
import useInvoiceContext from '../context'
import useUserContext from '../../user/context'
import useForm from '../../common/form'
import Header from '../../common/form/Header'
import Section from '../../common/form/Section'
import ClientContext from '../../client/context'
import EditItem from '../../contractItem/components/Edit'
import ListItem from '../../contractItem/components/List'

export default function() {
  const [user] = useUserContext()
  const [clients] = useContext(ClientContext)
  const [invoices, dispatch] = useInvoiceContext()

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
  const {Form, TextField, DateField, Select} = useForm(invoice.current)

  useEffect(() => {
    invoice.current = defaultInvoice

    setLocalTaxRate(invoice.current.taxRate)
    setItems(invoice.current.items)
    setTotal(invoice.current.total)
  }, [invoices])

  function addItem(item: ContractItem) {
    setItems([...items, item])
    setTotal(total + item.total)
  }

  function setTaxRate(value: string | number | null | undefined) {
    setLocalTaxRate(_.isNil(value) ? null : Number(value))
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

          <DateField name="deliveredAt" label="Date de livraison" />

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
    </Fragment>
  )
}
