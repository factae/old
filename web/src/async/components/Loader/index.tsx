import React from 'react'
import {useSpring, animated, config} from 'react-spring'

import useAsyncContext from '../../context'

type Props = {
  loading?: true
}

export default function(props: Props) {
  const async = useAsyncContext()
  const loading = props.loading || async.loading

  const style = useSpring({
    opacity: Number(loading),
    pointerEvents: loading ? 'initial' : 'none',
    config: config.stiff,
  })

  return (
    <animated.div className="loader" style={style}>
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </animated.div>
  )
}
