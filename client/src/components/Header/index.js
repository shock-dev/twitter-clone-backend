import React from 'react';
import './index.scss';
import logo from '../../assets/img/logo.png';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <a className="header__logo" href="/">
                        <img className="header__logo-img" src={logo} alt="Logo" />
                    </a>
                    <div className="header__actions">
                        <button className="header__action">
                            Login
                        </button>
                        <button className="header__action">
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
