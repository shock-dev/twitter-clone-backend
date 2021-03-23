import React from 'react';
import './index.scss';
import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Link className="header__logo" to="/">
                        <img className="header__logo-img" src={logo} alt="Logo" />
                    </Link>
                    <div className="header__actions">
                        <Link className="header__action" to="/login">
                            Login
                        </Link>
                        <Link className="header__action" to="/register">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
