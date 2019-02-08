// The basics
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

// Action creators and helpers
import { establishCurrentUser } from './modules/auth'
import { isServer } from './store'

// Components
import Pages from './pages'
import ScrollToTop from './components/ScrollToTop'
import Loadable from 'react-loadable'

// Global styles
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const TopNav = Loadable({
  loader: () => import(/* webpackChunkName: "topnav" */ './components/TopNav'),
  loading: () => null,
})

class App extends Component {
  componentWillMount() {
    const { isAuthenticated, currentUser, establishCurrentUser } = this.props
    if (!isServer) establishCurrentUser(isAuthenticated, currentUser)
  }

  render() {
    return (
      <ScrollToTop>
        <div id="app">
          <TopNav
            isAuthenticated={this.props.isAuthenticated}
            pathName={this.props.location.pathname}
          />
          <div id="content">
            <Pages />
          </div>
        </div>
      </ScrollToTop>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentUser: state.auth.currentUser,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ establishCurrentUser }, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
