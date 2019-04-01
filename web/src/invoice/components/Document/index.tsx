import React, {Fragment, useContext} from 'react'
import {BlobProvider, Document, Page, Text, View} from '@react-pdf/renderer'
import isNull from 'lodash/isNull'
import {Theme} from '@material-ui/core'
import {useTheme} from '@material-ui/styles'

import {toEuro} from '../../../common/utils/currency'
import ProfileContext from '../../../user/context'
import {Invoice} from '../../model'
import {Client} from '../../../client/model'
import {RateUnit} from '../../../user/model'
import Download from '../Download'

import useStyle from './styles'

interface Props {
  invoice: Invoice
  client: Client
  onSuccess: (pdf: string) => void
  onError: (error: Error) => void
}

export default function(props: Props) {
  const {invoice, client} = props
  const [profile] = useContext(ProfileContext)
  const theme = useTheme<Theme>()
  const styles = useStyle(theme)

  if (isNull(profile)) {
    return null
  }

  function handleDownloadSuccess(blob: Blob | null) {
    return () => {
      const pdfReader = new FileReader()

      if (isNull(blob)) {
        return props.onError(new Error())
      }

      pdfReader.readAsDataURL(blob)
      pdfReader.onloadend = () =>
        isNull(pdfReader.result)
          ? props.onError(new Error())
          : props.onSuccess(String(pdfReader.result))
    }
  }

  function renderTVANumber() {
    if (!profile!.taxId) {
      return null
    }

    return <Text style={styles.taxId}>N° TVA : {profile!.taxId}</Text>
  }

  function renderDuration() {
    const duration = invoice.endsAt
      .diff(invoice.startsAt, ['months', 'days', 'hours'])
      .toObject()

    if (duration.months) return `(${Math.round(duration.months + 1)} mois) `
    if (duration.days) return `(${Math.round(duration.days + 1)} jours) `
    if (duration.hours) return `(${Math.round(duration.hours + 1)} heures) `
    return null
  }

  function renderRateUnit() {
    if (!invoice.rate) {
      return null
    }

    switch (invoice.rateUnit) {
      case RateUnit.hour:
        return <Text style={styles.metadataTitle}>Taux horaire</Text>

      case RateUnit.day:
        return <Text style={styles.metadataTitle}>Taux journalier</Text>

      case RateUnit.service:
        return <Text style={styles.metadataTitle}>Taux forfaitaire</Text>
    }
  }

  function renderRate() {
    if (!invoice.rate) {
      return null
    }

    return <Text style={styles.metadataItem}>{toEuro(invoice.rate)}</Text>
  }

  function renderTaxRateRows() {
    if (!invoice.taxRate) {
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
            {toEuro(invoice.total)}
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
            {invoice.taxRate}%
          </Text>
        </View>
      </Fragment>
    )
  }

  function renderConditions() {
    if (!invoice.conditions) {
      return null
    }

    return (
      <View style={styles.section}>
        <Text style={styles.conditions}>{invoice.conditions}</Text>
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
                  {profile.firstName} {profile.lastName}
                </Text>

                <Text>{profile.address}</Text>
                <Text>
                  {profile.zip} {profile.city}
                </Text>

                <Text>{profile.email}</Text>
                <Text>{profile.phone}</Text>
                <Text style={styles.siren}>SIREN : {profile!.siren}</Text>
                {renderTVANumber()}
              </View>
              <View>
                <Text style={styles.title}>Facture</Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.fullWidth}>
                <Text style={styles.subTitle}>Facturé à</Text>

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
                    <Text style={styles.metadataTitle}>Facture n°</Text>
                    <Text style={styles.metadataTitle}>Date</Text>
                    <Text style={styles.metadataTitle}>Expiration offre</Text>
                    <Text style={styles.metadataTitle}>Début</Text>
                    <Text style={styles.metadataTitle}>Fin</Text>
                    {renderRateUnit()}
                  </View>
                  <View style={styles.metadata}>
                    <Text style={styles.metadataItem}>{invoice.number}</Text>
                    <Text style={styles.metadataItem}>
                      {invoice.createdAt.toFormat('dd/LL/yyyy')}
                    </Text>
                    <Text style={styles.metadataItem}>
                      {invoice.expiresAt.toFormat('dd/LL/yyyy')}
                    </Text>
                    <Text style={styles.metadataItem}>
                      {invoice.startsAt.toFormat('dd/LL/yyyy')}
                    </Text>
                    <Text style={styles.metadataItem}>
                      {renderDuration()}
                      {invoice.endsAt.toFormat('dd/LL/yyyy')}
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
              {invoice.items.map((item, key) => (
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
                  {toEuro(invoice.total * (1 + Number(invoice.taxRate) * 0.01))}
                </Text>
              </View>
            </View>

            {renderConditions()}

            <View style={styles.section}>
              <View>
                <Text style={styles.bankTitle}>Coordonnées bancaires :</Text>
                <Text style={styles.bankItem}>RIB : {profile.rib}</Text>
                <Text style={styles.bankItem}>IBAN : {profile.iban}</Text>
                <Text style={styles.bankItem}>BIC : {profile.bic}</Text>
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
          fileName={`facture-${invoice.number}.pdf`}
          onSuccess={handleDownloadSuccess(blobProps.blob)}
          onError={props.onError}
        />
      )}
    </BlobProvider>
  )
}
