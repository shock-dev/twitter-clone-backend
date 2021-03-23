import React from 'react';
import './index.scss';
import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/user';

const Header = () => {
    const dispatch = useDispatch();
    const { info } = useSelector(({ user }) => user);

    const logoutHandler = () => {
        dispatch(logout());
        localStorage.removeItem('token');
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Link className="header__logo" to="/">
                        <img className="header__logo-img" src={logo} alt="Logo" />
                    </Link>
                    {info === null ? (
                        <div className="header__actions">
                            <Link className="header__action" to="/login">
                                Login
                            </Link>
                            <Link className="header__action" to="/register">
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div className="header__actions">
                            <button onClick={logoutHandler} className="header__action">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
