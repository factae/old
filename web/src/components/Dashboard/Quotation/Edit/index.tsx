import React, {useContext} from 'react'
import assign from 'lodash/fp/assign'
import find from 'lodash/fp/find'
import flow from 'lodash/fp/flow'
import fromPairs from 'lodash/fp/fromPairs'
import isNil from 'lodash/fp/isNil'
import IconSave from '@material-ui/icons/Save'
import Grid from '@material-ui/core/Grid'
import MuiTextField from '@material-ui/core/TextField'

import * as quotationService from '../../../../services/quotation'
import AsyncContext from '../../../../contexts/async'
import QuotationContext from '../../../../contexts/quotation'
import useRouting from '../../../../hooks/routing'
import Quotation from '../../../../models/Quotation'
import Header from '../../Form/Header'
import Section from '../../Form/Section'
import TextField from '../../Form/TextField'

export default function() {
  const async = useContext(AsyncContext)
  const {state: quotations, dispatch} = useContext(QuotationContext)
  const {match, goBack} = useRouting()
  const id = isNil(match.params.id) ? null : +match.params.id
  const quotation = isNil(id) ? null : find({id: +id})(quotations)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    async.start()

    const quotationWithoutId = flow(
      Array.from,
      fromPairs,
      assign({id: -1}),
    )(new FormData(event.currentTarget)) as Quotation

    console.log(Array.from(new FormData(event.currentTarget)))
    return

    try {
      const quotation = await quotationService.create(quotationWithoutId)
      dispatch({type: 'create', quotation})
      goBack()
      async.stop('Devis créé.')
    } catch (error) {
      console.error(error.message)
      async.stop('Erreur lors de la création du devis !')
    }
  }

  if (!isNil(id) && isNil(quotation)) {
    return null
  }

  return (
    <form onSubmit={submit}>
      <Header
        title={isNil(id) ? 'Créer un devis' : 'Modifier un quotation'}
        tooltip="Sauvegarder"
        icon={IconSave}
      />

      <Section title="Informations générales">
        <TextField name="number" label="Numéro" autoFocus />
        <TextField name="deposit" label="Acompte" autoFocus />
        <TextField name="taxeRate" label="TVA" autoFocus />
      </Section>

      <Section title="Liste des produits/services">
        <Grid item xs={4}>
          <MuiTextField name="designation[]" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={4}>
          <MuiTextField name="designation[]" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={4}>
          <MuiTextField name="designation[]" fullWidth variant="outlined" />
        </Grid>
      </Section>
    </form>
  )
}
