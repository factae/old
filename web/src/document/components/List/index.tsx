import React, {Fragment} from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import IconLi from '@material-ui/icons/ArrowRightAlt'
import IconLegend from '@material-ui/icons/Help'
import _ from 'lodash/fp'

import {Document, DocumentType} from '../../model'
import useDocumentContext from '../../context'
import Chip from '../ListItem/Status/Chip'
import DocumentListItem from '../ListItem'

import {useStyles} from './styles'

type Props = {
  type: DocumentType
}

export default function({type}: Props) {
  const {documents} = useDocumentContext()
  const classes = useStyles()

  if (_.isNull(documents)) {
    return null
  }

  function byType(document: Document) {
    return document.type === type
  }

  return (
    <Fragment>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell className={classes.number}>Numéro</TableCell>
            <TableCell className={classes.date}>Date</TableCell>
            <TableCell className={classes.client}>Client</TableCell>
            <TableCell className={classes.status}>Statut</TableCell>
            <TableCell className={classes.total}>Total HT</TableCell>
            <TableCell className={classes.actions}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.filter(byType).map((document, key) => (
            <DocumentListItem key={key} document={document} />
          ))}
        </TableBody>
      </Table>

      <details open={!Boolean(documents.length)}>
        <Typography className={classes.legendSummary} component="summary">
          <IconLegend className={classes.legendSummaryIcon} fontSize="small" />
          Afficher la légende
        </Typography>
        <div className={classes.legend}>
          <div className={classes.legendColumn}>
            <span className={classes.legendRow}>
              <Chip value="draft" />
            </span>
            <span className={classes.legendRow}>
              <Chip value="pending" />
            </span>
            <span className={classes.legendRow}>
              <Chip value="signed" />
            </span>
            <span className={classes.legendRow}>
              <Chip value="paid" />
            </span>
          </div>
          <div className={classes.legendColumn}>
            <span className={classes.legendRow}>
              <IconLi />
            </span>
            <span className={classes.legendRow}>
              <IconLi />
            </span>
            <span className={classes.legendRow}>
              <IconLi />
            </span>
            <span className={classes.legendRow}>
              <IconLi />
            </span>
          </div>
          <div className={classes.legendColumn}>
            <Typography className={classes.legendRow} component="span">
              document sans numéro (brouillon), modification libre
            </Typography>
            <Typography className={classes.legendRow} component="span">
              document validé, en attente d'action du client (chaque
              modification générera un nouveau pdf)
            </Typography>
            <Typography className={classes.legendRow} component="span">
              devis signé (document verrouillé)
            </Typography>
            <Typography className={classes.legendRow} component="span">
              facture payée (document verrouillé)
            </Typography>
          </div>
        </div>
      </details>
    </Fragment>
  )
}
