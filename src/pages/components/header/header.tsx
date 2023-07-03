import React, { useState, useEffect } from 'react';
import './header.css';
import logo from "./scan_logo.png"
import ImitInformation from './information/limit_information';
import AccountLogin from './account_login/account_login';
import MenuIcon from "./menu_icon.png"

function Header() {
    const [isModalOpen, setisModalOpen] = useState(false);

    const handleModalToggle = () => {
        setisModalOpen(!isModalOpen)
    }

    

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

                <div className="header__navigation_mini">
                    <button className="header__navigation_mini_button"
                        onClick={handleModalToggle}>
                            <img src={MenuIcon} alt="" />
                    </button>
                    
                    {isModalOpen &&
                    <div className="header__navigation_mini_modal">
                        <div className="header__navigation_mini_modal_content">
                                <AccountLogin/>
                                <p><a href="/">Главная</a></p>
                                <p><a href="/">Тарифы</a></p>
                                <p><a href="/">FAQ</a></p>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;







