import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from '../components/AuthenticatedRoute'
import UnauthenticatedRoute from '../components/UnauthenticatedRoute'
import Loadable from 'react-loadable'

const Intro = Loadable({
  loader: () => import(/* webpackChunkName: "intro" */ './Intro'),
  loading: () => null,
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

    <UnauthenticatedRoute exact path="/login" component={Login} />
    <AuthenticatedRoute exact path="/logout" component={Logout} />

    <Route component={NotFound} />
  </Switch>
)
