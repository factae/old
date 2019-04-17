import React, {Fragment, useEffect} from 'react'

import useAsyncContext from '../async/context'
import Header from './Header'
import Description from './Description'
import Engagements from './Engagements'
import Features from './Features'
import Footer from './Footer'

export default function() {
  const async = useAsyncContext()

  useEffect(() => {
    async.stop()
  }, [])

  return (
    <Fragment>
      <Header />
      <Description />
      <Engagements />
      <Features />
      <Footer />
    </Fragment>
  )
}
