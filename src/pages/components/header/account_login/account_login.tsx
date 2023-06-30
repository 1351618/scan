import React from 'react';
import './account_login.css';
import rectangle from "./rectangle.png"

function AccountLogin() {
    return (
        <div className="account-login">

            <div className="account-login__content"
                // style={{display: "none"}}
                >
                    <button className="account-login__content-register">Зарегистрироваться</button>
                    <img src={rectangle} alt="" style={{height: "26px"}}/>
                    <button className="account-login__content-login">
                        <a href="/authorization">Войти</a></button>
            </div>

            <div className="account-login__user"
                style={{display: "none"}}
                >
                    <div className="account-login__name-exit">
                        <p>Алексей А.</p>
                        <span className="account-login__name-exit_exit">Выйти</span>
                    </div>
                    <img className="account-login__name-exit_photo" src="" alt="" />
            </div>


        </div>
    );
}

export default AccountLogin;