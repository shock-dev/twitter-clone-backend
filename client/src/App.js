import React, { useEffect } from 'react';
import Header from './components/Header';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from './store/actions/user';

const App = () => {
    const dispatch = useDispatch();
    const { info } = useSelector(({ user }) => user);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            dispatch(fetchUserInfo())
        }
    }, []);

    return (
        <Router>
            <Header />
            <div className="page container">
                {info !== null ? (
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                ) : (
                    <Switch>
                        <Route path="/login" exact>
                            <Login />
                        </Route>
                        <Route path="/register" exact>
                            <Register />
                        </Route>
                        <Redirect to="/login" />
                    </Switch>
                )}
            </div>
        </Router>
    );
};

export default App;
