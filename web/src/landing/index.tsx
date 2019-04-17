import React, {Fragment} from 'react'

import Header from './Header'
import Description from './Description'
import Engagements from './Engagements'
import Features from './Features'
import Footer from './Footer'

export default function() {
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
