import React, {Fragment} from 'react'

import Header from './Header'
import Description from './Description'
import Pricing from './Pricing'
import Footer from './Footer'

export default function() {
  return (
    <Fragment>
      <Header />
      <Description />
      <Pricing />
      <Footer />
    </Fragment>
  )
}
