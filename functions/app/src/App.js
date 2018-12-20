// The basics
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

// Action creators and helpers
import { establishCurrentUser } from './modules/auth'
import { isServer } from './store'

import Pages from './pages'

import injectSheet from 'react-jss'

const styles = {
  app: {
    maxWidth: '80rem',
    margin: '0 auto',
    minHeight: '100%',
  },
}

class App extends Component {
  componentWillMount() {
    if (!isServer) {
      this.props.establishCurrentUser()
    }
  }

  render() {
    return (
      <div id="app">
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
  )(injectSheet(styles)(App))
)
