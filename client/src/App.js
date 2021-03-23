import React from 'react';
import Header from './components/Header';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NoMatch from './pages/NoMatch';

const App = () => {
    return (
        <Router>
          <Header />
          <Switch>
              <Route path="/" exact>
                  <Home />
              </Route>
              <Route path="/login" exact>
                  <Login />
              </Route>
              <Route path="/register" exact>
                  <Register />
              </Route>
              <Route path="*">
                  <NoMatch />
              </Route>
          </Switch>
        </Router>
    );
};

export default App;
