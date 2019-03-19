import {useEffect} from 'react'
import {saveAs} from 'file-saver'

// From @react-pdf/renderer/index.d.ts
type Props = {
  blob: Blob | null
  url: string | null
  loading: boolean
  error: Error | null
  fileName: string
  onSuccess: () => void
  onError: (error: Error) => void
}

export default function(props: Props) {
  const {error, blob, fileName} = props
  const successDownload = props.onSuccess
  const errorDownload = props.onError

  useEffect(() => {
    if (error) return errorDownload(error)
    if (blob) {
      saveAs(blob, fileName)
      successDownload()
    }
  }, [props])

  return null
}
