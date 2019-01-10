import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from '../components/AuthenticatedRoute'
import UnauthenticatedRoute from '../components/UnauthenticatedRoute'
import Loadable from 'react-loadable'

const Loading = props => {
  if (props.error) {
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    )
  } else if (props.timedOut) {
    return (
      <div>
        Taking a long time… <button onClick={props.retry}>Retry</button>
      </div>
    )
  } else if (props.pastDelay) {
    return <div>Loading…</div>
  } else {
    return null
  }
}

export const rootURL = () =>
  typeof document !== 'undefined'
    ? `${document.location.protocol}//${document.location.hostname}${document
        .location.port && `:${document.location.port}`}`
    : process.env.REACT_APP_ROOT_URL || process.env.NODE_ENV === 'production'
    ? 'https://willshown.com'
    : 'http://localhost:5000'

const Intro = Loadable({
  loader: () => import(/* webpackChunkName: "intro" */ './Intro'),
  loading: () => null,
})

const Portfolio = Loadable({
  loader: () => import(/* webpackChunkName: "portfolio" */ './Portfolio'),
  loading: Loading,
})

const CV = Loadable({
  loader: () => import(/* webpackChunkName: "cv" */ './CV'),
  loading: Loading,
})

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ './Login'),
  loading: () => null,
})

const Logout = Loadable({
  loader: () => import(/* webpackChunkName: "logout" */ './Logout'),
  loading: () => null,
})

const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "notfound" */ './NotFound'),
  loading: () => null,
})

export default () => (
  <Switch>
    <Route exact path="/" component={Intro} />
    <Route exact path="/portfolio" component={Portfolio} />
    <Route exact path="/cv" component={CV} />

    <UnauthenticatedRoute exact path="/login" component={Login} />
    <AuthenticatedRoute exact path="/logout" component={Logout} />

    <Route component={NotFound} />
  </Switch>
)
