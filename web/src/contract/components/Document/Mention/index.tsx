import React from 'react'
import isNull from 'lodash/isNull'
import {View, Text} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core'

import {User} from '../../../../user/model'

import useStyle from './styles'

type Props = {
  theme: Theme
  type: 'quotation' | 'invoice'
  user: User
}

export default function({theme, type, user}: Props) {
  const styles = useStyle(theme)
  const isInvoice = type === 'invoice'

  return (
    <View>
      <Text style={styles.mention}>
        Dispensé d’immatriculation au registre du commerce et des sociétés (RCS)
        et au répertoire des métiers (RM).
      </Text>

      {isNull(user.taxId) ? (
        <Text style={styles.mention}>TVA non applicable, art 293B du CGI.</Text>
      ) : null}

      {isInvoice ? (
        <Text style={styles.mention}>
          Pour tout professionnel, en sus des indemnités de retard, toute somme,
          y compris l’acompte, non payée à sa date d’exigibilité produira de
          plein droit le paiement d’une indemnité forfaitaire de 40 euros due au
          titre des frais de recouvrement (Art. 441-6, I al. 12 du code de
          commerce et D. 441-5 ibidem).
        </Text>
      ) : null}

      {isInvoice ? (
        <Text style={styles.mention}>
          Pas d'escompte pour règlement anticipé.
        </Text>
      ) : null}
    </View>
  )
}
