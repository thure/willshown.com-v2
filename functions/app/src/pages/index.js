import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from '../components/AuthenticatedRoute'
import UnauthenticatedRoute from '../components/UnauthenticatedRoute'
import Loadable from 'react-loadable'

import NotFound from './NotFound'

const Intro = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ './Intro'),
  loading: () => null,
  modules: ['Intro'],
})

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ './Login'),
  loading: () => null,
  modules: ['Login'],
})

const Logout = Loadable({
  loader: () => import(/* webpackChunkName: "logout" */ './Logout'),
  loading: () => null,
  modules: ['Logout'],
})

export default () => (
  <Switch>
    <Route exact path="/" component={Intro} />

    <UnauthenticatedRoute exact path="/login" component={Login} />
    <AuthenticatedRoute exact path="/logout" component={Logout} />

    <Route component={NotFound} />
  </Switch>
)
