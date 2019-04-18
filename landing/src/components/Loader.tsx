import 'common/loader.css'

import React, {useEffect, useState} from 'react'
import {useSpring, animated, config} from 'react-spring'

export default function() {
  const [loading, setLoading] = useState(true)

  const style = useSpring({
    opacity: Number(loading),
    pointerEvents: loading ? 'initial' : 'none',
    config: config.stiff,
  })

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

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
