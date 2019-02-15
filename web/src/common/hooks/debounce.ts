import {useEffect, useRef} from 'react'
import cloneDeep from 'lodash/cloneDeep'
import noop from 'lodash/noop'

// ------------------------------------------------------------ # Type aliases #

type AnyCallback = (...args: any[]) => void
type Debounce<T extends AnyCallback> = (...params: Parameters<T>) => void

// -------------------------------------------------------------------- # Hook #

export default function() {
  return <T extends AnyCallback>(callback: T, delay = 250) => {
    const timeout = useRef<NodeJS.Timeout>(null)
    const debounce = useRef<Debounce<T>>(noop)
    const abort = useRef<() => void>(noop)
    const callbackCopy = useRef<() => void>(noop)

    useEffect(() => {
      debounce.current = (...params: Parameters<T>) => {
        callbackCopy.current = () => callback(...cloneDeep(params))
        abort.current = () => {
          if (timeout.current) {
            clearTimeout(timeout.current)
            callbackCopy.current()
          }
        }

        if (timeout.current) {
          clearTimeout(timeout.current)
        }

        // @ts-ignore
        // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065
        timeout.current = setTimeout(callbackCopy.current, delay)
      }

      return () => abort.current()
    }, [])

    return debounce.current
  }
}
