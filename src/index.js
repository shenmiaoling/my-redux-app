import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers, createStore} from 'redux'
import { Provider } from 'react-redux'
import Counter from './Components/Counter'
import counter from './Reducer'
// import routes from './routes'
// import createLogger from 'redux-logger';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
// import thunk from 'redux-thunk'
import NotFound from './Components/404.js'
import Hello from './Components/Header'
const store = createStore(
  combineReducers({
    count: counter,
    routing: routerReducer
  })
)
const history = syncHistoryWithStore(browserHistory, store)
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Counter}/>
      <Route path="hello" component={Hello}/>
      <Route path="*" component={NotFound}/>
    </Router>
  </Provider>,
  document.getElementById('root'))
// const history = syncHistoryWithStore(browserHistory, store)
// const render = () => ReactDOM.render(
//   <Provider store={store}>
//     <Router history={history} routes={routes}/>
//   </Provider>,
//   document.getElementById('root')
// )

