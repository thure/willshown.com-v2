import React, { Component } from 'react'
import get from 'lodash/get'
import { Deck, MarkdownSlides } from 'spectacle'
import { resolveDeck } from '../modules/portfolio'
import { spectacleTheme } from '../style/themeProvider'
import NotFound from './NotFound'

class PortfolioDeck extends Component {
  render() {
    const { privatePortfolio = null, match } = this.props

    const { item, portfolio } = resolveDeck(
      get(match, 'params.id'),
      privatePortfolio
    )

    if (item) return <Deck theme={spectacleTheme}>{MarkdownSlides(item)}</Deck>
    else return <NotFound />
  }
}

export default PortfolioDeck
