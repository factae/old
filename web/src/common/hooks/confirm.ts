import {useEffect, useRef, useState} from 'react'
import cloneDeep from 'lodash/cloneDeep'
import noop from 'lodash/noop'

// ------------------------------------------------------------------- # Types #

type ConfirmOptions = {
  message: string
}

// -------------------------------------------------------------------- # Hook #

export default function(options: ConfirmOptions) {
  return () => {
    const [open, setOpen] = useState(false)
  }
}
