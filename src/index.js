import React from 'react'
import ReactDOM from 'react-dom'
import nanobus from 'nanobus'
import nanorouter from 'nanorouter'

import Search from './Search'
import Results from './Results'

const bus = nanobus()
const router = nanorouter({ default: '/' })
const rootEl = document.getElementById('root')

let state = {
  query: null,
  results: []
}

bus.on('searchAddress', (address) => {
  const newState = Object.assign({}, state, { query: address })
  bus.emit('render', newState)
})

bus.on('render', function (newState) {
  const path = window.location.hash.substr(1)
  const { Component, params } = router(path)
  newState.params = params
  const Route = <Component state={newState} emit={bus.emit.bind(bus)} />
  ReactDOM.render(Route, rootEl)
  state = newState
})

router.on('/', createRoute(Search))
router.on('/address/:address', createRoute(Results))

function createRoute (Component) {
  return (params) => ({ Component, params })
}

bus.emit('render', state)
window.onhashchange = () => bus.emit('render', state)
