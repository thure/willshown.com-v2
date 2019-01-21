import React, { Component } from 'react'
import { withRouter } from 'react-router'
import injectSheet from 'react-jss'
import Helmet from 'react-helmet'
import logo from '../assets/social-logo.png'

const SITE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://willshown.com'

const defaultTitle = 'Will Shown'
const defaultDescription = "Will Shown's online portfolio"
const defaultImage = `${SITE_URL}${logo}`
const defaultTwitter = '@wwwillshown'
const defaultSep = ' | '

const styles = {
  page: {
    padding: '1rem',
    maxWidth: '56rem',
    margin: '0 auto',
    '@media (min-width: 600px)': {
      padding: '2rem',
    },
  },
}

class Page extends Component {
  getMetaTags(
    {
      title,
      description,
      image,
      contentType,
      twitter,
      noCrawl,
      published,
      updated,
      category,
      tags,
    },
    pathname
  ) {
    const theTitle = title
      ? (title + defaultSep + defaultTitle).substring(0, 60)
      : defaultTitle
    const theDescription = description
      ? description.substring(0, 155)
      : defaultDescription
    const theImage = image ? `${SITE_URL}${image}` : defaultImage

    const metaTags = [
      { itemprop: 'name', content: theTitle },
      { itemprop: 'description', content: theDescription },
      { itemprop: 'image', content: theImage },
      { name: 'description', content: theDescription },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: defaultTwitter },
      { name: 'twitter:title', content: theTitle },
      { name: 'twitter:description', content: theDescription },
      { name: 'twitter:creator', content: twitter || defaultTwitter },
      { name: 'twitter:image:src', content: theImage },
      { property: 'og:title', content: theTitle },
      { property: 'og:type', content: contentType || 'website' },
      { property: 'og:url', content: SITE_URL + pathname },
      { property: 'og:image', content: theImage },
      { property: 'og:description', content: theDescription },
      { property: 'og:site_name', content: defaultTitle },
    ]

    if (noCrawl) {
      metaTags.push({ name: 'robots', content: 'noindex, nofollow' })
    }

    if (published) {
      metaTags.push({ name: 'article:published_time', content: published })
    }
    if (updated) {
      metaTags.push({ name: 'article:modified_time', content: updated })
    }
    if (category) {
      metaTags.push({ name: 'article:section', content: category })
    }
    if (tags) {
      metaTags.push({ name: 'article:tag', content: tags })
    }

    return metaTags
  }

  render() {
    const { children, id, className, classes, ...etc } = this.props

    return (
      <div id={id} className={className}>
        <Helmet
          htmlAttributes={{
            lang: 'en',
            itemscope: undefined,
            itemtype: `http://schema.org/${etc.schema || 'WebPage'}`,
          }}
          title={
            etc.title ? etc.title + defaultSep + defaultTitle : defaultTitle
          }
          link={[
            {
              rel: 'canonical',
              href: SITE_URL + this.props.location.pathname,
            },
          ]}
          meta={this.getMetaTags(etc, this.props.location.pathname)}
        />
        <main className={classes.page}>{children}</main>
      </div>
    )
  }
}

export default withRouter(injectSheet(styles)(Page))
