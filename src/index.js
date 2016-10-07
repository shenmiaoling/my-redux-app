import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import Counter from './Components/Counter'
import reducer from './Reducer'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import NotFound from './Components/404.js'
import Hello from './Components'
// Store
const store = createStore(
  combineReducers(Object.assign(reducer, {
  routing: routerReducer
  })



  )
)
const history = syncHistoryWithStore(browserHistory, store)
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Counter}></Route>
      <Route path="hello" component={Hello}/>
      <Route path="*" component={NotFound}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)
