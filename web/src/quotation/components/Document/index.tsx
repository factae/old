import React, {Fragment, useContext} from 'react'
import {BlobProvider, Document, Page, Text, View} from '@react-pdf/renderer'
import isNull from 'lodash/isNull'
import {Theme} from '@material-ui/core'
import {useTheme} from '@material-ui/styles'

import {toEuro} from '../../../common/utils/currency'
import UserContext from '../../../user/context'
import {Quotation} from '../../model'
import {Client} from '../../../client/model'
import {RateUnit} from '../../../user/model'
import Download from '../Download'

import useStyle from './styles'

interface Props {
  quotation: Quotation
  client: Client
  onSuccess: () => void
  onError: (error: Error) => void
}

export default function(props: Props) {
  const {quotation, client} = props
  const [user] = useContext(UserContext)
  const theme = useTheme<Theme>()
  const styles = useStyle(theme)

  if (isNull(user)) {
    return null
  }

  function renderTVANumber() {
    if (!user!.taxId) {
      return null
    }

    return <Text style={styles.taxId}>N° TVA : {user!.taxId}</Text>
  }

  function renderDuration() {
    const duration = quotation.endsAt
      .diff(quotation.startsAt, ['months', 'days', 'hours'])
      .toObject()

    if (duration.months) return `(${Math.round(duration.months + 1)} mois) `
    if (duration.days) return `(${Math.round(duration.days + 1)} jours) `
    if (duration.hours) return `(${Math.round(duration.hours + 1)} heures) `
    return null
  }

  function renderRateUnit() {
    if (!quotation.rate) {
      return null
    }

    switch (quotation.rateUnit) {
      case RateUnit.hour:
        return <Text style={styles.metadataTitle}>Taux horaire</Text>

      case RateUnit.day:
        return <Text style={styles.metadataTitle}>Taux journalier</Text>

      case RateUnit.service:
        return <Text style={styles.metadataTitle}>Taux forfaitaire</Text>
    }
  }

  function renderRate() {
    if (!quotation.rate) {
      return null
    }

    return <Text style={styles.metadataItem}>{toEuro(quotation.rate)}</Text>
  }

  function renderTaxRateRows() {
    if (!quotation.taxRate) {
      return null
    }

    return (
      <Fragment>
        <View style={styles.tr}>
          <Text
            style={{
              ...styles.td,
              ...styles.subTotal,
              ...styles.textMuted,
            }}
          >
            Total HT
          </Text>
          <Text style={{...styles.td, ...styles.textMuted}}>
            {toEuro(quotation.total)}
          </Text>
        </View>
        <View style={styles.tr}>
          <Text
            style={{
              ...styles.td,
              ...styles.subTotal,
              ...styles.textMuted,
            }}
          >
            TVA
          </Text>
          <Text style={{...styles.td, ...styles.textMuted}}>
            {quotation.taxRate}%
          </Text>
        </View>
      </Fragment>
    )
  }

  function renderConditions() {
    if (!quotation.conditions) {
      return null
    }

    return (
      <View style={styles.section}>
        <Text style={styles.conditions}>{quotation.conditions}</Text>
      </View>
    )
  }

  return (
    <BlobProvider
      document={
        <Document>
          <Page style={styles.page}>
            <View style={styles.section}>
              <View style={styles.fullWidth}>
                <Text style={styles.name}>
                  {user.firstName} {user.lastName}
                </Text>

                <Text>{user.address}</Text>
                <Text>
                  {user.zip} {user.city}
                </Text>

                <Text>{user.email}</Text>
                <Text>{user.phone}</Text>
                <Text style={styles.siren}>SIREN : {user!.siren}</Text>
                {renderTVANumber()}
              </View>
              <View>
                <Text style={styles.title}>Devis</Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.fullWidth}>
                <Text style={styles.subTitle}>Devis à l'attention de</Text>

                <Text>
                  {client.firstName} {client.lastName}
                </Text>
                <Text>{client.address}</Text>
                <Text>
                  {client.zip} {client.city}
                </Text>
                <Text>{client.email}</Text>
                <Text>{client.phone}</Text>
              </View>

              <View style={styles.fullWidth}>
                <View style={styles.flexRow}>
                  <View style={styles.metadata}>
                    <Text style={styles.metadataTitle}>Date</Text>
                    <Text style={styles.metadataTitle}>Expiration offre</Text>
                    <Text style={styles.metadataTitle}>Début</Text>
                    <Text style={styles.metadataTitle}>Fin</Text>
                    {renderRateUnit()}
                  </View>
                  <View style={styles.metadata}>
                    <Text style={styles.metadataItem}>
                      {quotation.createdAt.toFormat('dd/LL/yyyy')}
                    </Text>
                    <Text style={styles.metadataItem}>
                      {quotation.expiresAt.toFormat('dd/LL/yyyy')}
                    </Text>
                    <Text style={styles.metadataItem}>
                      {quotation.startsAt.toFormat('dd/LL/yyyy')}
                    </Text>
                    <Text style={styles.metadataItem}>
                      {renderDuration()}
                      {quotation.endsAt.toFormat('dd/LL/yyyy')}
                    </Text>
                    {renderRate()}
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.table}>
              <View
                style={{...styles.tr, backgroundColor: theme.palette.grey[100]}}
              >
                <Text style={{...styles.th, ...styles.description}}>
                  Désignation
                </Text>
                <Text style={styles.th}>Quantité</Text>
                <Text style={styles.th}>Prix unitaire HT</Text>
                <Text style={styles.th}>Montant HT</Text>
              </View>
              {quotation.items.map((item, key) => (
                <View key={key} style={styles.tr}>
                  <Text style={{...styles.td, ...styles.description}}>
                    {item.description}
                  </Text>
                  <Text style={styles.td}>{item.quantity}</Text>
                  <Text style={styles.td}>{toEuro(item.unitPrice)}</Text>
                  <Text style={styles.td}>{toEuro(item.total)}</Text>
                </View>
              ))}
              {renderTaxRateRows()}
              <View style={styles.tr}>
                <Text style={{...styles.td, ...styles.totalLabel}}>
                  Total TTC
                </Text>
                <Text style={{...styles.td, ...styles.totalAmount}}>
                  {toEuro(
                    quotation.total * (1 + Number(quotation.taxRate) * 0.01),
                  )}
                </Text>
              </View>
            </View>

            {renderConditions()}

            <View style={styles.section}>
              <View>
                <Text style={styles.bankTitle}>Coordonnées bancaires :</Text>
                <Text style={styles.bankItem}>RIB : {user.rib}</Text>
                <Text style={styles.bankItem}>IBAN : {user.iban}</Text>
                <Text style={styles.bankItem}>BIC : {user.bic}</Text>
              </View>
            </View>

            <Text
              fixed
              style={styles.pagination}
              render={({pageNumber, totalPages}) =>
                `${pageNumber} / ${totalPages}`
              }
            />
          </Page>
        </Document>
      }
    >
      {blobProps => (
        <Download
          {...blobProps}
          fileName={`devis-${quotation.id}.pdf`}
          onSuccess={props.onSuccess}
          onError={props.onError}
        />
      )}
    </BlobProvider>
  )
}
