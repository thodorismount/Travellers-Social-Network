import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

//Components
import NavBar from './components/NavBar';
//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import signup from './pages/signup';

import userProfile from './pages/userProfile';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { post } from 'jquery';

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
              <Route exact path='/Home' component={Home} />
              <Route exact path='/Login' component={Login} />
              <Route exact path='/signup' component={signup} />
              <Route exact path='/userprofile' component={userProfile} />
              <Route exact path='/posts' component={post} />

            </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
