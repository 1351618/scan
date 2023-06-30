import React from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './authorization.css';
import lock from "./lock.png"
import authorization_img from "./authorization_img.png"
import AuthorizationWindow from './authorization_window/authorization_window';


function Authorization() {
    return (
        <>
            <Header />
            <div className="authorization">
                <p className='authorization__p'>
                    Для оформления подписки <br /> 
                    на тариф, необходимо <br /> 
                    авторизоваться.
                </p>
                <div className='authorization__placeholder'>
                    <img  className='authorization__placeholder-img' src={lock} alt="" />
                    <div className='authorization__placeholder-div'><AuthorizationWindow/></div>
                </div>
                <img className='authorization__img' src={authorization_img} alt="" />
            </div>
            <div className="authorization__footer">
                <Footer />
            </div>
            
        </>
    );
}

export default Authorization;
