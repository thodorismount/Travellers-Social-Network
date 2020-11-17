import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
import Footer from './components/Footer';

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
            <div className='scrollbar'>
              <Route exact path='/' component={Login} />
              
              <PrivateRoute exact path='/Home' component={Home} />
              
              <Route exact path='/Login' component={Login} />
              
              <PrivateRoute
                exact
                path='/userProfile/:id'
                component={userProfile}
              />
            </div>
            </Switch>
            
          </div>
          <Footer />
        </Router>
        
      </div>
    </Provider>
  );
};

export default App;
