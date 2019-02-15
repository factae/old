import React, {Fragment, useContext, useState} from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconSave from '@material-ui/icons/Save'
import IconAdd from '@material-ui/icons/Add'

import * as service from '../service'
import Quotation from '../model'
import ContractItem from '../../contractItem/model'
import QuotationContext from '../context'
import AsyncContext from '../../common/contexts/async'
import useRouting from '../../common/hooks/routing'
import useForm from '../../common/form'
import Header from '../../common/form/Header'
import Section from '../../common/form/Section'
import ClientContext from '../../client/context'
import {toEuro} from '../../common/utils/form'

import {useStyles} from './styles'

export default function() {
  return null
  /* const {goBack} = useRouting() */
  /* const async = useContext(AsyncContext) */
  /* const dispatch = useContext(QuotationContext)[1] */
  /* const [clients] = useContext(ClientContext) */
  /* const [contractItems, setContractItems] = useState<ContractItem[]>([]) */
  /* const [total, setTotal] = useState(0) */
  /* const [taxRate, setTaxRate] = useState(0) */
  /* const [QuotationForm, QuotationField] = useForm<Quotation>(null) */
  /* const [ContractItemForm, ItemField] = useForm<ContractItem>(null) */
  /* const classes = useStyles() */

  /* async function createQuotation(quotation: Quotation) { */
  /*   async.start() */

  /*   try { */
  /*     const quotationWithId = await service.create(quotation) */
  /*     dispatch({type: 'create', quotation: quotationWithId}) */
  /*     async.stop('Devis créé.') */
  /*   } catch (error) { */
  /*     console.error(error.message) */
  /*     return async.stop('Erreur lors de la création du devis !') */
  /*   } */

  /*   goBack() */
  /* } */

  /* function createContractItem(nextContractItem: ContractItem) { */
  /*   const total = nextContractItem.unitPrice * nextContractItem.quantity */
  /*   const nextContractItems = [...contractItems, {...nextContractItem, total}] */

  /*   setContractItems(nextContractItems) */
  /*   setTotal( */
  /*     nextContractItems */
  /*       .map(({total}) => total) */
  /*       .reduce((sum, total) => sum + total, 0), */
  /*   ) */
  /* } */

  /* function handleTaxRate(event: React.ChangeEvent<HTMLInputElement>) { */
  /*   setTaxRate(Number(event.currentTarget.value.trim())) */
  /* } */

  /* return ( */
  /*   <Fragment> */
  /*     <QuotationForm onSubmit={createQuotation}> */
  /*       <Header title="Créer un devis" tooltip="Sauvegarder" icon={IconSave} /> */

  /*       <Section title="Informations générales"> */
  /*         <QuotationField name="number" label="Numéro" /> */
  /*         <QuotationField */
  /*           name="taxRate" */
  /*           label="TVA (%)" */
  /*           type="number" */
  /*           onChange={handleTaxRate} */
  /*         /> */
  /*         <QuotationField name="deposit" label="Acompte (%)" type="number" /> */

  /*         <Grid item xs={12}> */
  /*           <Select value={10}> */
  /*             <MenuItem value={10}>Ten</MenuItem> */
  /*             <MenuItem value={20}>Twenty</MenuItem> */
  /*             <MenuItem value={30}>Thirty</MenuItem> */
  /*           </Select> */
  /*         </Grid> */
  /*       </Section> */
  /*     </QuotationForm> */

  /*     <ContractItemForm resetOnSubmit onSubmit={createContractItem}> */
  /*       <Section title="Liste des articles/services"> */
  /*         <ItemField */
  /*           grid={{xs: 12, sm: 4}} */
  /*           name="description" */
  /*           label="Description" */
  /*         /> */

  /*         <ItemField */
  /*           grid={{xs: 12, sm: 3}} */
  /*           name="unitPrice" */
  /*           label="Prix" */
  /*           type="number" */
  /*         /> */

  /*         <ItemField */
  /*           grid={{xs: 12, sm: 3}} */
  /*           name="quantity" */
  /*           label="Quantité" */
  /*           type="number" */
  /*         /> */

  /*         <Grid item xs={12} sm={2}> */
  /*           <Button */
  /*             fullWidth */
  /*             type="submit" */
  /*             color="primary" */
  /*             variant="outlined" */
  /*             className={classes.submit} */
  /*           > */
  /*             <IconAdd className={classes.icon} /> */
  /*             Ajouter */
  /*           </Button> */
  /*         </Grid> */

  /*         <Grid item xs={12}> */
  /*           <Paper> */
  /*             <Table> */
  /*               <TableHead> */
  /*                 <TableRow> */
  /*                   <TableCell>Description</TableCell> */
  /*                   <TableCell align="right">Prix unitaire</TableCell> */
  /*                   <TableCell align="right">Quantité</TableCell> */
  /*                   <TableCell align="right">Total</TableCell> */
  /*                 </TableRow> */
  /*               </TableHead> */
  /*               <TableBody> */
  /*                 {contractItems.map((item, index) => ( */
  /*                   <TableRow key={index}> */
  /*                     <TableCell>{item.description}</TableCell> */
  /*                     <TableCell align="right"> */
  /*                       {toEuro(item.unitPrice)} */
  /*                     </TableCell> */
  /*                     <TableCell align="right">{item.quantity}</TableCell> */
  /*                     <TableCell align="right"> */
  /*                       {toEuro(item.unitPrice * item.quantity)} */
  /*                     </TableCell> */
  /*                   </TableRow> */
  /*                 ))} */
  /*               </TableBody> */
  /*               <TableFooter className={classes.footer}> */
  /*                 {taxRate > 0 && ( */
  /*                   <TableRow> */
  /*                     <TableCell align="right">Total HT:</TableCell> */
  /*                     <TableCell align="right" colSpan={3}> */
  /*                       {toEuro(total)} */
  /*                     </TableCell> */
  /*                   </TableRow> */
  /*                 )} */
  /*                 <TableRow> */
  /*                   <TableCell align="right">Total TTC :</TableCell> */
  /*                   <TableCell align="right" colSpan={3}> */
  /*                     {toEuro(total * (1 + taxRate * 0.01))} */
  /*                   </TableCell> */
  /*                 </TableRow> */
  /*               </TableFooter> */
  /*             </Table> */
  /*           </Paper> */
  /*         </Grid> */
  /*       </Section> */
  /*     </ContractItemForm> */
  /*   </Fragment> */
  /* ) */
}
