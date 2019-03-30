import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'
import IconAdd from '@material-ui/icons/Add'

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
      <Section title="Articles / services">
        <TextField
          name="description"
          label="Description"
          autoFocus={autoFocus}
        />

        <TextField name="quantity" label="Quantité" type="number" />

        <TextField
          name="unitPrice"
          label="Prix"
          type="number"
          value={unitPrice}
        />

        <Button
          className={classes.button}
          type="submit"
          variant="outlined"
          color="primary"
        >
          <IconAdd className={classes.icon} />
          Ajouter
        </Button>
      </Section>
    </Form>
  )
}
