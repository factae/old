import React from 'react'
import {BlobProvider, Document, Page} from '@react-pdf/renderer'
import isNull from 'lodash/isNull'
import {Theme} from '@material-ui/core/styles/createMuiTheme'
import {useTheme} from '@material-ui/styles'

import Download from './Download'
import Pagination from './Pagination'

import useStyle from './styles'

type Props = {
  fileName: string
  children: React.ReactNode
  onDownload: (pdf: string) => void
  onError: (error: Error) => void
}

export default function(props: Props) {
  const theme: Theme = useTheme()
  const styles = useStyle(theme)

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
          : props.onDownload(String(pdfReader.result))
    }
  }

  return (
    <BlobProvider
      document={
        <Document>
          <Page style={styles.page}>
            {props.children}
            <Pagination theme={theme} />
          </Page>
        </Document>
      }
    >
      {blobProps => (
        <Download
          {...blobProps}
          fileName={props.fileName}
          onSuccess={handleDownloadSuccess(blobProps.blob)}
          onError={props.onError}
        />
      )}
    </BlobProvider>
  )
}
