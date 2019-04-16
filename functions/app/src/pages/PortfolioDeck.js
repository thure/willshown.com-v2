import React, { Component } from 'react'
import get from 'lodash/get'
import {
  // Appear,
  // BlockQuote,
  // Cite,
  // CodePane,
  // Code,
  Deck,
  Fill,
  Fit,
  // Heading,
  // Image,
  Layout,
  // ListItem,
  // List,
  // Quote,
  Slide,
  // Text
} from 'spectacle'
import { resolveDeck } from '../modules/portfolio'
import { spectacleTheme } from '../style/themeProvider'
import { withStyles } from '@material-ui/core'
import NotFound from './NotFound'
import RoutedMarkdown from '../components/RoutedMarkdown'

const transforms = {}

const LAYOUT = /[❪❮⸦]((\n|.)+?)⸧/g

const styles = {
  center: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    height: '100%',
    padding: '2rem',
    '& ul li, & ol li': {
      textAlign: 'left',
      margin: '.8em 0',
    },
  },
  imageStage: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    '& img': {
      maxHeight: '60vh',
    },
  },
}

const CenterAlign = withStyles(styles)(({ children, classes }) => (
  <div className={classes.center}>
    <div>{children}</div>
  </div>
))

const ImageStage = withStyles(styles)(({ children, classes }) => (
  <div className={classes.imageStage}>{children}</div>
))

class PortfolioDeck extends Component {
  render() {
    const { privatePortfolio = null, match } = this.props

    const { item } = resolveDeck(get(match, 'params.id'), privatePortfolio)

    const slides = item.split(/\n---\n/).map((markdown, index) => {
      if (LAYOUT.test(markdown))
        return (
          <Slide>
            <Layout>
              {markdown.match(LAYOUT).map(child => {
                const content = (
                  <RoutedMarkdown
                    withHTML
                    source={child.substring(1, child.length - 1)}
                    transforms={transforms}
                  />
                )
                switch (child[0]) {
                  case '❪':
                    return (
                      <Fit>
                        <CenterAlign>{content}</CenterAlign>
                      </Fit>
                    )
                  case '❮':
                    return (
                      <Fill>
                        <CenterAlign>{content}</CenterAlign>
                      </Fill>
                    )
                  case '⸦':
                    return <ImageStage>{content}</ImageStage>
                  default:
                    return null
                }
              })}
            </Layout>
          </Slide>
        )
      else
        return (
          <Slide key={`md-slide-${index}`}>
            <RoutedMarkdown
              withHTML
              source={markdown}
              transforms={transforms}
            />
          </Slide>
        )
    })

    if (item)
      return (
        <Deck theme={spectacleTheme} showFullscreenControl={false}>
          {slides}
        </Deck>
      )
    else return <NotFound />
  }
}

export default PortfolioDeck
