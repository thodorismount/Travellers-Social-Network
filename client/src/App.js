import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';

//Components
import NavBar from './components/NavBar';
//Pages
import Home from './pages/Home';
import Login from './pages/Login';

import userProfile from './pages/userProfile';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { post } from 'jquery';
import Posts from './components/posts/Posts';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className='App'>
        <Router>
          <NavBar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Login} />
              <PrivateRoute exact path='/Home' component={Home} />
              <Route exact path='/Login' component={Login} />
              <PrivateRoute exact path='/userprofile' component={userProfile} />
            </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
