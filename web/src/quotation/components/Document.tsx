import React, {useContext} from 'react'
import isNull from 'lodash/isNull'
import {Theme} from '@material-ui/core'
import {useTheme} from '@material-ui/styles'

import Document from './../../contract/components/Document'
import Section from './../../contract/components/Document/Section'
import UserView from './../../contract/components/Document/User'
import TitleView from './../../contract/components/Document/Title'
import ClientView from '../../contract/components/Document/Client'
import InfoView from '../../contract/components/Document/Info'
import ItemListView from '../../contract/components/Document/ItemList'
import ConditionView from '../../contract/components/Document/Condition'
import BankView from '../../contract/components/Document/Bank'
import MentionView from '../../contract/components/Document/Mention'
import UserContext from '../../user/context'
import {Quotation} from '../model'
import {Client} from '../../client/model'
import {RateUnit} from '../../user/model'
import {toEuro} from '../../common/utils/currency'

interface Props {
  quotation: Quotation
  client: Client
  onSuccess: (pdf: string) => void
  onError: (error: Error) => void
}

export default function(props: Props) {
  const {quotation, client} = props
  const [user] = useContext(UserContext)
  const theme = useTheme<Theme>()

  if (isNull(user) || isNull(quotation.createdAt)) {
    return null
  }

  function rateLabel() {
    switch (quotation.rateUnit) {
      case RateUnit.day:
        return 'Taux journalier'
      case RateUnit.hour:
        return 'Taux horaire'
      case RateUnit.service:
        return 'Taux forfaitaire'
    }
  }

  const infos = {
    'Date émission': quotation.createdAt.toFormat('dd/LL/yyyy'),
    'Expiration offre': quotation.expiresAt.toFormat('dd/LL/yyyy'),
    'Début prestation': quotation.startsAt.toFormat('dd/LL/yyyy'),
    'Fin prestation': quotation.endsAt.toFormat('dd/LL/yyyy'),
    [rateLabel()]: toEuro(quotation.rate),
  }

  return (
    <Document
      fileName={`devis-${quotation.id}.pdf`}
      onDownload={props.onSuccess}
      onError={props.onError}
    >
      <Section theme={theme}>
        <UserView theme={theme} user={user} />
        <TitleView title="Devis" />
      </Section>

      <Section theme={theme}>
        <ClientView
          theme={theme}
          title="Devis à l'attention de"
          client={client}
        />
        <InfoView theme={theme} infos={infos} />
      </Section>

      <Section theme={theme}>
        <ItemListView theme={theme} contract={quotation} />
      </Section>

      <Section theme={theme}>
        <ConditionView conditions={quotation.conditions} />
      </Section>

      <Section theme={theme}>
        <BankView theme={theme} user={user} />
      </Section>

      <Section theme={theme}>
        <MentionView theme={theme} type="quotation" user={user} />
      </Section>
    </Document>
  )
}
