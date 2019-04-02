import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconAdd from '@material-ui/icons/AddCircleOutline'

import {ContractItem, emptyItem} from '../../model'
import useForm from '../../../common/form'
import Section from '../../../common/form/Section'

import {useStyles} from './styles'

type Props = {
  rate: number | null
  onAdd: (item: ContractItem) => void
}

export default function({rate, onAdd: addItemParent}: Props) {
  const [item, setItem] = useState(emptyItem(rate))
  const [autoFocus, setAutoFocus] = useState(false)
  const [unitPrice, setUnitPrice] = useState(rate)
  const {Form, TextField} = useForm(item)
  const classes = useStyles()

  function addItem(nextItem: ContractItem) {
    nextItem.total = nextItem.quantity * nextItem.unitPrice
    addItemParent(nextItem)

    setAutoFocus(true)
    setItem(emptyItem(rate))
  }

  useEffect(() => {
    setUnitPrice(rate)
  }, [rate])

  return (
    <Form onSubmit={addItem}>
      <Section title="Designations">
        <TextField
          grid={{xs: 6}}
          name="description"
          label="Description"
          autoFocus={autoFocus}
        />

        <TextField
          grid={{xs: 2}}
          name="quantity"
          label="Quantité"
          type="number"
        />

        <TextField
          grid={{xs: 2}}
          name="unitPrice"
          label="Prix unitaire (€)"
          type="number"
          value={unitPrice}
        />

        <Grid className={classes.buttonContainer} item xs={2}>
          <Button
            className={classes.button}
            type="submit"
            variant="text"
            color="primary"
          >
            <IconAdd className={classes.icon} />
            Ajouter
          </Button>
        </Grid>
      </Section>
    </Form>
  )
}
