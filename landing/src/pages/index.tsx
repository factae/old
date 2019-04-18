import 'common/bootstrap'

import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import {ThemeProvider} from '@material-ui/styles'

import theme from 'common/theme'
import SEO from '../components/SEO'
import Navigation from '../components/Navigation'
import Header from '../components/Header'
import Description from '../components/Description'
import Engagements from '../components/Engagements'
import Features from '../components/Features'
import Footer from '../components/Footer'

export default function() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SEO />
      <Navigation />
      <Header />
      <Description />
      <Engagements />
      <Features />
      <Footer />
    </ThemeProvider>
  )
}
