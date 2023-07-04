import React, { useContext } from 'react';
import './account_login.css';
import rectangle from "./rectangle.png"
import FotoUser from "./foto_user.png"
import { AuthContext } from '../../../../AuthContext';

function AccountLogin() {
   
    const { authInfo, setAuthInfo } = useContext(AuthContext);
   
    return (
        <div className="account-login">

            <div className="account-login__content"
                style={{ display: authInfo.isAuthenticated ? 'none' : '' }}
                // style={{display: "none"}}
                >
                    <button className="account-login__content-register">Зарегистрироваться</button>
                    <img src={rectangle} alt="" style={{height: "26px"}}/>
                    <button className="account-login__content-login">
                        <a href="/authorization">Войти</a></button>
            </div>

            <div className="account-login__user"
                style={{ display: authInfo.isAuthenticated ? '' : 'none' }}
                // style={{display: "none"}}
                >
                    <div className="account-login__name-exit">
                        <p>Алексей А.</p>
                        <button  className="account-login__name-exit_exit">Выйти</button>
                        {/* <span className="account-login__name-exit_exit">Выйти</span> */}
                    </div>
                    <img className="account-login__name-exit_photo" src={FotoUser} alt="" />
            </div>


        </div>
    );
}

export default AccountLogin;