import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsCitizen, UserIsBusinessOwner, UserIsGovernment, UserIsNotAuthenticated } from './util/wrappers.js'
import getWeb3 from './util/web3/getWeb3'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import DashboardContainer from './layouts/dashboard/DashboardContainer'
import SignUp from './user/layouts/signup/SignUp'
import Operations from './user/layouts/operations/Operations'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch(() => {
  console.log('Error in web3 initialization.')
});

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={UserIsAuthenticated(DashboardContainer)} />
          <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
          <Route path="operations" component={UserIsGovernment(Operations)} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
