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

export default function(props: Props) {
  const {rate} = props
  const [item, setItem] = useState(emptyItem(rate))
  const {Form, TextField} = useForm(item)
  const classes = useStyles()

  useEffect(() => {
    setItem({...item, unitPrice: rate || 0})
  }, [rate])

  function addItem(nextItem: ContractItem) {
    nextItem.total = nextItem.quantity * nextItem.unitPrice
    props.onAdd(nextItem)
    setItem(emptyItem(rate))
  }

  return (
    <Form onSubmit={addItem}>
      <Section title="Articles / services">
        <TextField name="description" label="Description" />
        <TextField name="unitPrice" label="Prix" type="number" />
        <TextField name="quantity" label="Quantité" type="number" />

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
