import React from 'react'
import {BlobProvider, Document as PDF, Page} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'
import {useTheme} from '@material-ui/styles'
import _ from 'lodash/fp'

import {Document} from '../../../model'
import {isQuotation} from '../../../../quotation/model'
import {isInvoice} from '../../../../invoice/model'
import {isCredit} from '../../../../credit/model'
import Download from '../Download'
import Pagination from '../Pagination'

import useStyle from './styles'

type Props = {
  document: Document
  children: React.ReactNode
  onDownload: (pdf: string) => void
  onError: (error: Error) => void
}

export default function(props: Props) {
  const {document} = props
  const theme: Theme = useTheme()
  const styles = useStyle(theme)

  function handleDownloadSuccess(blob: Blob | null) {
    return () => {
      const pdfReader = new FileReader()

      if (_.isNull(blob)) {
        return props.onError(new Error())
      }

      pdfReader.readAsDataURL(blob)
      pdfReader.onloadend = () =>
        _.isNull(pdfReader.result)
          ? props.onError(new Error())
          : props.onDownload(String(pdfReader.result))
    }
  }

  function getFileName() {
    if (isQuotation(document)) return `devis-${document.number}.pdf`
    if (isInvoice(document)) return `facture-${document.number}.pdf`
    if (isCredit(document)) return `avoir-${document.number}.pdf`

    return 'document.pdf'
  }

  return (
    <BlobProvider
      document={
        <PDF>
          <Page style={styles.page}>
            {props.children}
            <Pagination theme={theme} />
          </Page>
        </PDF>
      }
    >
      {blobProps => (
        <Download
          {...blobProps}
          fileName={getFileName()}
          onSuccess={handleDownloadSuccess(blobProps.blob)}
          onError={props.onError}
        />
      )}
    </BlobProvider>
  )
}
