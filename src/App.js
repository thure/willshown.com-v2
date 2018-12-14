import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import injectSheet from 'react-jss'
import Intro from './pages/Intro'

const styles = {
  app: {
    maxWidth: '80rem',
    margin: '0 auto',
    minHeight: '100%',
  },
}

const App = ({classes}) => <Router>
  <main className={classes.app}>
    <Route exact path="/" component={Intro} />
  </main>
</Router>

export default injectSheet(styles)(App);
