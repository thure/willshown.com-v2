import React from 'react'
import { Route, Switch } from 'react-router-dom'
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

const Intro = Loadable({
  loader: () => import(/* webpackChunkName: "intro" */ './Intro'),
  loading: () => null,
})

const PortfolioItems = Loadable({
  loader: () =>
    import(/* webpackChunkName: "portfolioitems" */ './PortfolioItems'),
  loading: Loading,
  delay: 2e3,
})

const PortfolioItem = Loadable({
  loader: () =>
    import(/* webpackChunkName: "portfolioitem" */ './PortfolioItem'),
  loading: Loading,
  delay: 2e3,
})

const CV = Loadable({
  loader: () => import(/* webpackChunkName: "cv" */ './CV'),
  loading: Loading,
  delay: 2e3,
})

const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "notfound" */ './NotFound'),
  loading: () => null,
})

export default () => (
  <Switch>
    <Route exact path="/" component={Intro} />
    <Route exact path="/portfolio" component={PortfolioItems} />
    <Route exact path="/portfolio/:id" component={PortfolioItem} />
    <Route exact path="/cv" component={CV} />
    <Route component={NotFound} />
  </Switch>
)
