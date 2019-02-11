import React, {Fragment, useContext, useState} from 'react'
import range from 'lodash/fp/range'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import IconSave from '@material-ui/icons/Save'
import IconAdd from '@material-ui/icons/AddCircle'

import * as service from '../service'
import Quotation from '../model'
import QuotationContext from '../context'
import AsyncContext from '../../contexts/async'
import useRouting from '../../hooks/routing'
import useForm from '../../components/Dashboard/Form'
import Header from '../../components/Dashboard/Form/Header'
import Section from '../../components/Dashboard/Form/Section'

export default function() {
  const {goBack} = useRouting()
  const async = useContext(AsyncContext)
  const dispatch = useContext(QuotationContext)[1]
  const {Form, Field} = useForm<Quotation>(null)
  const [countItems, setCountItems] = useState(3)

  async function createQuotation(quotation: Quotation) {
    async.start()

    try {
      const quotationWithId = await service.create(quotation)
      dispatch({type: 'create', quotation: quotationWithId})
      async.stop('Devis créé.')
    } catch (error) {
      console.error(error.message)
      return async.stop('Erreur lors de la création du devis !')
    }

    goBack()
  }

  const action = {
    onClick: () => setCountItems(countItems + 1),
    tooltip: 'Ajouter une ligne',
    icon: IconAdd,
  }

  return (
    <Form onSubmit={createQuotation}>
      <Header title="Créer un devis" tooltip="Sauvegarder" icon={IconSave} />

      <Section title="Informations générales">
        <Field name="number" label="Numéro" />
        <Field name="taxRate" label="TVA (%)" type="number" />
        <Field name="deposit" label="Acompte (%)" type="number" />
      </Section>

      <Section title="Liste des articles/services" action={action}>
        {range(0)(countItems).map(index => (
          <Fragment key={index}>
            <Grid item xs={4}>
              <TextField
                name={`items[${index}].description`}
                label="Description"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name={`items[${index}].unitPrice`}
                label="Prix unitaire"
                type="number"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name={`items[${index}].quantity`}
                label="Quantité"
                type="number"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Fragment>
        ))}
      </Section>

      <Section title="Total">
        <Grid item xs={12} sm={4}>
          <TextField
            inputProps={{readOnly: true}}
            name="total"
            label="Total HT"
            type="number"
            fullWidth
            variant="outlined"
            value={10}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            inputProps={{readOnly: true}}
            label="TVA"
            type="number"
            fullWidth
            variant="outlined"
            value={10}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            inputProps={{readOnly: true}}
            label="Total TTC"
            type="number"
            fullWidth
            variant="outlined"
          />
        </Grid>
      </Section>
    </Form>
  )
}
