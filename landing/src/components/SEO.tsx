import React from 'react'
import Helmet from 'react-helmet'
import {useStaticQuery, graphql} from 'gatsby'

export default function() {
  const description = ''
  const lang = 'fr'
  const meta: HTMLMetaElement[] = []
  const keywords: string[] = []
  const title = 'factAE'

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

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      link={[
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Quicksand:400,700',
        },
      ]}
      htmlAttributes={{
        lang,
      }}
      title={site.siteMetadata.title}
      titleTemplate={`%s | Accueil`}
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
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : [],
        )
        .concat(meta)}
    />
  )
}
