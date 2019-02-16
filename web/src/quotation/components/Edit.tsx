import React, {Fragment, useContext, useState} from 'react'
import isNull from 'lodash/isNull'
import MenuItem from '@material-ui/core/MenuItem'
import IconSave from '@material-ui/icons/Save'

import * as service from '../service'
import {Quotation, emptyQuotation} from '../model'
import {ContractItem} from '../../contractItem/model'
import QuotationContext from '../context'
import useForm from '../../common/form'
import Header from '../../common/form/Header'
import Section from '../../common/form/Section'
import ClientContext from '../../client/context'
import ContractItemList from '../../contractItem/components/List'

const defaultQuotation = emptyQuotation()

export default function() {
  const dispatch = useContext(QuotationContext)[1]
  const [clients] = useContext(ClientContext)
  const [total, setTotal] = useState(0)
  const [taxRate, setTaxRate] = useState(0)
  const [contractItems, setContractItems] = useState<ContractItem[]>([])
  const {Form, TextField, Select} = useForm<Quotation>(defaultQuotation)

  async function createQuotation(quotation: Quotation) {
    const quotationWithId = await service.create(quotation)
    dispatch({type: 'create', quotation: quotationWithId})
  }

  function addContractItem(nextContractItem: ContractItem) {
    const nextContractItems = [...contractItems, nextContractItem]
    const nextTotal = nextContractItems
      .map(contractItem => contractItem.total)
      .reduce((sum, nextTotal) => sum + nextTotal, 0)

    setContractItems(nextContractItems)
    setTotal(nextTotal)
  }

  function handleTaxRate(value: string) {
    setTaxRate(Number(value))
  }

  if (isNull(clients)) {
    return null
  }

  return (
    <Fragment>
      <Form onSubmit={createQuotation}>
        <Header title="Créer un devis" label="Sauvegarder" icon={IconSave} />

        <Section title="Informations générales">
          <TextField name="number" label="Numéro" />

          <TextField
            name="taxRate"
            label="TVA (%)"
            type="number"
            onChange={handleTaxRate}
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

      <ContractItemList
        total={total}
        taxRate={taxRate}
        value={contractItems}
        onSubmit={addContractItem}
      />
    </Fragment>
  )
}
