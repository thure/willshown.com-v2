import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import get from 'lodash/get'
import Page from '../components/Page'
import NotFound from './NotFound'
import publicPortfolio from '../config/portfolio.public'
import { withStyles } from '@material-ui/core'

const styles = {}

const resolveItem = (id, privatePortfolio) => {
  if (id) {
    if (privatePortfolio) {
      const privateItem = privatePortfolio.structure.find(
        item => item.id === id
      )
      if (privateItem) return privateItem
    }
    return publicPortfolio.structure.find(item => item.id === id)
  } else return null
}

class PortfolioItem extends React.Component {
  render() {
    const { privatePortfolio = null, classes, match } = this.props

    const item = resolveItem(get(match, 'params.id'), privatePortfolio)

    if (item)
      return (
        <Page
          id={`portfolio_${item.id}`}
          title={`${item.title} | Portfolio`}
          description={`Will Shown's online portfolio: ${item.title}`}
        >
          <main className={classes.categories}>{item.title}</main>
        </Page>
      )
    else return NotFound
  }
}

const mapStateToProps = state => ({
  privatePortfolio: state.auth.privatePortfolio,
})

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withStyles(styles)
)(PortfolioItem)
