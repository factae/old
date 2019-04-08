import React from 'react'
import {useSpring, animated, config} from 'react-spring'

import useAsyncContext from '../../context'

export default function() {
  const {loading} = useAsyncContext()

  const props = useSpring({
    opacity: Number(loading),
    pointerEvents: loading ? 'initial' : 'none',
    config: config.stiff,
  })

  return (
    <animated.div className="loader" style={props}>
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </animated.div>
  )
}
