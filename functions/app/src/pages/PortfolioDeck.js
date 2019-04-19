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
import AssetInFlow from '../components/AssetInFlow'
import { compose } from 'redux'
import { connect } from 'react-redux'

const transforms = {
  image: ({ alt, src }) => {
    const dims = alt.split('×').map(parseInt)
    return (
      <AssetInFlow
        light
        asset={{
          type: 'image',
          dims,
          alt: '',
          sources: {
            png: {
              src,
            },
          },
        }}
      />
    )
  },
  parsedHtml: ({ element }) => {
    const children = get(element, 'props.children', []).map(child => {
      if (child.type === 'img') {
        const dims = [
          parseInt(get(child, 'props.width')),
          parseInt(get(child, 'props.height')),
        ]
        return (
          <AssetInFlow
            maxWidth={dims[0] / dims[1] > 1.61 ? 'none' : '90vh'}
            light
            forceFullWidth={get(child, ['props', 'data-forcefullwidth'], false)}
            noMotion={get(child, ['props', 'data-nomotion'], false)}
            asset={{
              type: 'image',
              dims,
              alt: get(child, 'props.title', ''),
              sources: {
                png: {
                  src: get(child, 'props.src'),
                },
              },
            }}
          />
        )
      } else {
        return child
      }
    })
    return <React.Fragment>{children}</React.Fragment>
  },
}

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
    '& > div :first-child': {
      marginTop: 0,
    },
  },
  imageStage: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
        <Deck
          theme={spectacleTheme}
          progress="none"
          showFullscreenControl={false}
        >
          {slides}
        </Deck>
      )
    else return <NotFound />
  }
}

const mapStateToProps = state => ({
  privatePortfolio: state.auth.privatePortfolio,
})

export default compose(
  connect(
    mapStateToProps,
    null
  )
)(PortfolioDeck)
