import React, {useContext, useState} from 'react'
import noop from 'lodash/noop'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconAdd from '@material-ui/icons/Add'

import {ContractItem, emptyContractItem} from '../../model'
import AsyncContext from '../../../common/contexts/async'
import useForm from '../../../common/form'

import {useStyles} from './styles'

type Props = {
  onSubmit: (contractItem: ContractItem) => void
}

export default function(props: Props) {
  const handleSubmitParent = props.onSubmit || noop
  const {loading} = useContext(AsyncContext)
  const [contractItem, setContractItem] = useState(emptyContractItem())
  const {Form, TextField} = useForm(contractItem)
  const classes = useStyles()

  function handleSubmit(nextContractItem: ContractItem) {
    const total = nextContractItem.unitPrice * nextContractItem.quantity
    handleSubmitParent({...nextContractItem, total})
    setContractItem(emptyContractItem())
  }

  return (
    <TableRow>
      <TableCell colSpan={4} className={classes.cell}>
        <Form inline onSubmit={handleSubmit}>
          <Grid
            container
            spacing={8}
            classes={{'spacing-xs-8': classes.spacing, item: classes.item}}
          >
            <TextField
              autoFocus
              name="description"
              label="Description"
              grid={{xs: 12, sm: 4, classes: {item: classes.item}}}
            />
            <TextField
              name="unitPrice"
              label="Prix"
              type="number"
              grid={{xs: 12, sm: 3, classes: {item: classes.item}}}
            />
            <TextField
              name="quantity"
              label="Quantité"
              type="number"
              grid={{xs: 12, sm: 3, classes: {item: classes.item}}}
            />
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="outlined"
                disabled={loading}
                className={classes.submit}
              >
                <IconAdd className={classes.icon} />
                Ajouter
              </Button>
            </Grid>
          </Grid>
        </Form>
      </TableCell>
    </TableRow>
  )
}
