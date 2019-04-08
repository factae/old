import React, {Fragment, useEffect} from 'react'

import useAsyncContext from '../async/context'
import Header from './Header'
import Description from './Description'
import Pricing from './Pricing'
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
      <Pricing />
      <Footer />
    </Fragment>
  )
}
