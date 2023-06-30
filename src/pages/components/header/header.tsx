import React from 'react';
import './header.css';
import logo from "./scan_logo.png"
import ImitInformation from './information/limit_information';
import AccountLogin from './account_login/account_login';

function Header() {

    return (
        <div className="header">
            <div className="header__logo">
                <a href="/"><img src={logo} alt="" /></a>
                
            </div>
            <div className="header__navigation">
                <a href="/">Главная</a>
                <a href="/">Тарифы</a>
                <a href="/">FAQ</a>
                  
            </div>
            <div className="header__block">
                <div className="header__block-information" 
                    // style={{display: "none"}}
                    >
                        <ImitInformation/>
                </div>
                <div className="header__block-account">
                    <AccountLogin/>
                </div>
            </div>

        </div>
    );
}

export default Header;







