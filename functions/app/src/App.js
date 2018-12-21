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

// Styles
import injectSheet from 'react-jss'
import Loadable from 'react-loadable'

const styles = {
  app: {
    maxWidth: '80rem',
    margin: '0 auto',
    minHeight: '100%',
  },
}

const TopNav = Loadable.Map({
  loader: {
    TopNav: () =>
      import(/* webpackChunkName: "topnav" */ './components/TopNav'),
    icons: () => import(/* webpackChunkName: "icons" */ './style/icons'),
  },
  loading: () => null,
  render(loaded, props) {
    let TopNav = loaded.TopNav.default
    return <TopNav {...props} icons={loaded.icons} />
  },
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
  )(injectSheet(styles)(App))
)
