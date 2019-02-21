import React, {Fragment, useContext, useEffect, useState} from 'react'
import find from 'lodash/find'
import isNil from 'lodash/isNil'
import isNull from 'lodash/isNull'
import MenuItem from '@material-ui/core/MenuItem'
import IconSave from '@material-ui/icons/Save'

import * as service from '../service'
import {Quotation, emptyQuotation} from '../model'
import {ContractItem, emptyItem} from '../../contractItem/model'
import useRouting from '../../common/hooks/routing'
import QuotationContext from '../context'
import useForm from '../../common/form'
import Header from '../../common/form/Header'
import Section from '../../common/form/Section'
import ClientContext from '../../client/context'
import EditItem from '../../contractItem/components/Edit'
import ListItem from '../../contractItem/components/List'

export default function() {
  const [clients] = useContext(ClientContext)
  const [quotations, dispatch] = useContext(QuotationContext)

  const {match} = useRouting()
  const id = isNil(match.params.id) ? -1 : Number(match.params.id)
  const defaultQuotation = find(quotations, {id}) || emptyQuotation

  const [items, setItems] = useState([emptyItem()])
  const [total, setTotal] = useState(0)
  const [taxRate, setLocalTaxRate] = useState(0)

  const {Form, TextField, Select} = useForm<Quotation>(defaultQuotation)

  useEffect(() => {
    setItems(defaultQuotation.items)
    setLocalTaxRate(defaultQuotation.taxRate)
    setTotal(defaultQuotation.total)
  }, [quotations])

  function addItem(item: ContractItem) {
    setItems([...items, item])
    setTotal(total + item.total)
  }

  async function saveQuotation(quotation: Quotation) {
    quotation.total = total
    quotation.items = items

    if (id === -1) {
      quotation = await service.create(quotation)
      dispatch({type: 'create', quotation})
    } else {
      quotation = await service.update(quotation)
      dispatch({type: 'update', quotation})
    }
  }

  function setTaxRate(value: string) {
    setLocalTaxRate(Number(value))
  }

  if ((id > -1 && isNull(quotations)) || isNull(clients)) {
    return null
  }

  return (
    <Fragment>
      <Form main onSubmit={saveQuotation}>
        <Header
          title={id === -1 ? 'Créer un devis' : 'Modifier un devis'}
          label="Sauvegarder"
          icon={IconSave}
        />

        <Section title="Informations générales">
          <TextField autoFocus name="number" label="Numéro" />
          <TextField
            required={false}
            name="taxRate"
            label="TVA (%)"
            type="number"
            onChange={setTaxRate}
          />
          <TextField name="deposit" label="Acompte (%)" type="number" />
          <Select name="clientId" label="Client">
            {clients.map(client => (
              <MenuItem key={client.id} value={client.id}>
                {client.firstName} {client.lastName}
              </MenuItem>
            ))}
          </Select>
        </Section>
      </Form>

      <EditItem onAdd={addItem} />
      <ListItem items={items} total={total} taxRate={taxRate} />
    </Fragment>
  )
}
