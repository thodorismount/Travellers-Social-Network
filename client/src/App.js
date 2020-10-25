import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

//Components
import NavBar from './components/NavBar';
//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import createUserProfile from './pages/createUserProfile';


// Redux
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <Router>
            <NavBar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={login} />
                <Route exact path='/home' component={home} />
                <Route exact path='/login' component={login} />
                <Route exact path='/signup' component={signup} />
                <Route exact path='/createuserprofile'   component={createUserProfile}  />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
