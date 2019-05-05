import React from 'react'
import Helmet from 'react-helmet'
import {graphql, useStaticQuery} from 'gatsby'

export default function() {
  const {site} = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  )

  const title = `factAE`
  const metaDescription = site.siteMetadata.description
  const keywords = [
    'factae',
    'micro-entreprise',
    'outil',
    'facturation',
    'facture',
    'devis',
    'avoir',
    'auto-entrepreneur',
    'simple',
    '1 € par mois',
  ]

  return (
    <Helmet
      link={[
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Quicksand:400,700',
        },
      ]}
      htmlAttributes={{lang: 'fr'}}
      title={title}
      titleTemplate={`%s - ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(
        keywords.length > 0
          ? {
              name: `keywords`,
              content: keywords.join(`, `),
            }
          : [],
      )}
    />
  )
}
