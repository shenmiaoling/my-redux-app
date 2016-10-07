import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import reducers from '../src/Reducer'
import Counter from '../src/Components/Counter'
import NotFound from '../src/Components/NotFounds'

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={Counter}>
        <IndexRoute component={Counter}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
// import React from 'react'
// import {
//   Route,
//   Router,
//   IndexRoute,
//   browserHistory
// } from 'react-router'
// import Counter from '../src/Components/Counter'
// import NotFound from '../src/Components/NotFound'
// module.exports = ()={
//   <Router history={browserHistory}>
//     <Route path='/' component={Counter}></Route>
//     <Route path="*" component={NotFound} />
//   </Router>
// }
