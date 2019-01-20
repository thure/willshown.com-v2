import React from 'react'
import Page from '../components/Page'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { withStyles } from '@material-ui/core/styles'

import PortfolioCategory from '../components/PortfolioCategory'
import AccessCodeInput from '../components/AccessCodeInput'

import publicPortfolio from '../config/portfolio.public.json'

const styles = theme => ({
  categories: {
    display: 'flex',
    flexFlow: 'row wrap',
    margin: '0 -2rem -2rem 0',
    padding: '0 2rem',
    boxSizing: 'border-box',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      padding: '0',
      width: 'auto',
    },
  },
  category: {
    flex: '1 0 auto',
    margin: '0 0 2rem 0',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      margin: '0 2rem 2rem 0',
      width: 'calc(50% - 2rem)',
    },
  },
})

class Portfolio extends React.Component {
  render() {
    const { privatePortfolio = null, classes } = this.props
    return (
      <Page
        id="portfolio"
        title="Portfolio"
        description="Will Shown's online portfolio: topics"
      >
        <AccessCodeInput />
        <main className={classes.categories}>
          {privatePortfolio &&
            privatePortfolio.structure.map(category => (
              <PortfolioCategory
                key={`PrivatePortfolioCategory__${category.title}`}
                portfolio={privatePortfolio}
                category={category}
                className={classes.category}
              />
            ))}
          {publicPortfolio.structure.map(category => (
            <PortfolioCategory
              key={`PortfolioCategory__${category.title}`}
              portfolio={publicPortfolio}
              category={category}
              className={classes.category}
            />
          ))}
        </main>
      </Page>
    )
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
)(Portfolio)
