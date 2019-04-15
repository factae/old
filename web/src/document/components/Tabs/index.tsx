import React, {Fragment} from 'react'
import _ from 'lodash/fp'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Header, {HeaderAction} from '../../../common/form/Header'
import {DocumentType} from '../../model'

import {useStyles} from './styles'

type Props = {
  value: DocumentType
  onChange: (type: DocumentType) => void
  onBack: () => void
  disabled?: boolean
  labels?: {[key in DocumentType]: string}
  action?: HeaderAction
}

const defaultLabels = {
  quotation: 'Devis',
  invoice: 'Factures',
  credit: 'Avoirs',
}

export default function(props: Props) {
  const {action, disabled, value: type} = props
  const labels = props.labels || defaultLabels
  const broadcastChange = props.onChange
  const goBack = props.onBack

  const classes = useStyles()

  function setType(_event: any, nextType: DocumentType) {
    broadcastChange(nextType)
  }

  return (
    <Fragment>
      <Header title={_.get(type, labels)} onBack={goBack} action={action} />
      <Tabs
        className={classes.tabs}
        value={type}
        onChange={setType}
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
      >
        {_.keys(labels).map(key => (
          <Tab
            classes={{root: classes.root, selected: classes.selected}}
            key={key}
            value={key}
            label={_.get(key, defaultLabels)}
            disabled={disabled}
          />
        ))}
      </Tabs>
    </Fragment>
  )
}
