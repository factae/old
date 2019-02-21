import React, {useContext, useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import {ContractItem} from '../../model'
import useForm from '../../../common/form'

import {useStyles} from './styles'

type Props = {
  value: ContractItem
  onChange: (item: ContractItem) => void
}

export default function(props: Props) {
  const defaultItem = props.value

  const [item, setItem] = useState(defaultItem)
  const {Form, TextField} = useForm(item)
  const classes = useStyles()

  /* useEffect(() => { */
  /*   setItem(defaultItem) */
  /* }, [defaultItem]) */

  return (
    <TableRow>
      <TableCell colSpan={4} className={classes.cell}>
        <Form onChange={props.onChange}>
          <Grid
            container
            spacing={8}
            classes={{'spacing-xs-8': classes.spacing, item: classes.item}}
          >
            <TextField
              autoFocus
              name="description"
              label="Description"
              grid={{xs: 12, sm: 5, classes: {item: classes.item}}}
            />
            <TextField
              name="unitPrice"
              label="Prix"
              type="number"
              grid={{xs: 12, sm: 4, classes: {item: classes.item}}}
            />
            <TextField
              name="quantity"
              label="Quantité"
              type="number"
              grid={{xs: 12, sm: 3, classes: {item: classes.item}}}
            />
          </Grid>
        </Form>
      </TableCell>
    </TableRow>
  )
}
