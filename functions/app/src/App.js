// The basics
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { initializeApp } from 'firebase'
import firebaseConfig from './config/client-credentials.json'

// Action creators and helpers
import { establishCurrentUser } from './modules/auth'
import { isServer } from './store'

// Components
import Pages from './pages'
import Loadable from 'react-loadable'

// Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Styles

const TopNav = Loadable({
  loader: () => import(/* webpackChunkName: "topnav" */ './components/TopNav'),
  loading: () => null,
})

class App extends Component {
  componentWillMount() {
    if (!isServer) {
      this.props.establishCurrentUser()
    }
  }

  render() {
    return (
      <div id="app">
        <TopNav
          isAuthenticated={this.props.isAuthenticated}
          pathName={this.props.location.pathname}
        />
        <div id="content">
          <Pages />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ establishCurrentUser }, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
