import React from 'react'
import {Theme} from '@material-ui/core/styles/createMuiTheme'
import {useTheme} from '@material-ui/styles'
import _ from 'lodash/fp'

import useUserContext from '../../../user/context'
import {Client} from '../../../client/model'
import {Document} from '../../model'
import Provider from './Provider'
import Section from './Section'
import UserView from './User'
import TitleView from './Title'
import ClientView from './Client'
import InfoView from './Info'
import ItemListView from './ItemList'
import ConditionView from './Condition'
import BankView from './Bank'
import MentionView from './Mention'

type Props = {
  document: Document | null
  client: Client | null
  onSuccess: (pdf: string) => void
  onError: (error: Error) => void
}

export default function(props: Props) {
  const {document, client} = props
  const [user] = useUserContext()
  const theme = useTheme<Theme>()

  if (_.isNull(user)) return null
  if (_.isNull(client)) return null
  if (_.isNull(document)) return null
  if (_.isNull(document.createdAt)) return null

  return (
    <Provider
      document={document}
      onDownload={props.onSuccess}
      onError={props.onError}
    >
      <Section theme={theme}>
        <TitleView document={document} />
        <InfoView theme={theme} document={document} />
      </Section>

      <Section theme={theme}>
        <UserView theme={theme} user={user} />
        <ClientView theme={theme} document={document} client={client} />
      </Section>

      <Section theme={theme}>
        <ItemListView theme={theme} document={document} />
      </Section>

      <Section theme={theme}>
        <BankView theme={theme} user={user} />
      </Section>

      <Section theme={theme}>
        <MentionView theme={theme} type={document.type} user={user} />
      </Section>

      <Section theme={theme}>
        <ConditionView theme={theme} conditions={document.conditions} />
      </Section>
    </Provider>
  )
}
