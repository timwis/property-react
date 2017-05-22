import React from 'react'
import ReactDOM from 'react-dom'
import nanobus from 'nanobus'
import nanorouter from 'nanorouter'

import Search from './Search'
import Results from './Results'

const bus = nanobus()
const router = nanorouter({ default: '/' })
const rootEl = document.getElementById('root')

const state = {
  results: []
}

bus.on('searchAddress', (address) => {
  console.log('searching address')
})

bus.on('render', function () {
  const path = window.location.hash.substr(1)
  const Route = router(path)
  ReactDOM.render(Route, rootEl)
})

router.on('/', function () {
  return <Search state={state} emit={bus.emit.bind(bus)} />
})

router.on('/address/:address', function (params) {
  state.params = params
  return <Results state={state} emit={bus.emit.bind(bus)} />
})

bus.emit('render')
window.onhashchange = () => bus.emit('render')
