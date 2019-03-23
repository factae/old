import React, {Fragment, useContext, useEffect, useState} from 'react'
import find from 'lodash/find'
import isNil from 'lodash/isNil'
import isNull from 'lodash/isNull'
import keys from 'lodash/keys'
import IconSave from '@material-ui/icons/Save'

import * as service from '../service'
import {Quotation, emptyQuotation} from '../model'
import {ContractItem, emptyItem} from '../../contractItem/model'
import {RateUnit} from '../../user/model'
import useRouting from '../../common/hooks/routing'
import QuotationContext from '../context'
import ProfileContext from '../../user/context'
import useForm from '../../common/form'
import Header from '../../common/form/Header'
import Section from '../../common/form/Section'
import ClientContext from '../../client/context'
import EditItem from '../../contractItem/components/Edit'
import ListItem from '../../contractItem/components/List'

export default function() {
  const [clients] = useContext(ClientContext)
  const [quotations, dispatch] = useContext(QuotationContext)
  const [profile] = useContext(ProfileContext)

  const {match} = useRouting()
  const id = isNil(match.params.id) ? -1 : Number(match.params.id)
  const defaultQuotation = find(quotations, {id}) || emptyQuotation(profile)

  const [rate, setRate] = useState(defaultQuotation.rate)
  const [items, setItems] = useState([emptyItem(defaultQuotation.rate)])
  const [total, setTotal] = useState(0)
  const [taxRate, setLocalTaxRate] = useState(0)

  const {Form, TextField, DateField, Select} = useForm<Quotation>(
    defaultQuotation,
  )

  useEffect(() => {
    setItems(defaultQuotation.items)
    setLocalTaxRate(defaultQuotation.taxRate)
    setTotal(defaultQuotation.total)
  }, [quotations])

  useEffect(() => {
    setRate(defaultQuotation.rate)
  }, [defaultQuotation.rate])

  function addItem(item: ContractItem) {
    setItems([...items, item])
    setTotal(total + item.total)
  }

  async function saveQuotation(quotation: Quotation) {
    quotation.total = total
    quotation.items = items

    if (id === -1) {
      await service.create(quotation)
      dispatch({type: 'create', quotation})
    } else {
      await service.update(quotation)
      dispatch({type: 'update', quotation})
    }
  }

  function setTaxRate(value: string) {
    setLocalTaxRate(Number(value))
  }

  if ((id > -1 && isNull(quotations)) || isNull(clients) || isNull(profile)) {
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
      <Form main onSubmit={saveQuotation}>
        <Header
          title={id === -1 ? 'Créer un devis' : 'Modifier un devis'}
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

          {profile.taxId && (
            <TextField
              name="taxRate"
              label="TVA (%)"
              type="number"
              onChange={setTaxRate}
            />
          )}

          <DateField name="expiresAt" label="Expiration de l'offre" />
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
