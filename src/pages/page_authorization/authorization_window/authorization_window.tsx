import React, { useState, useContext } from 'react';
import './authorization_window.css';
import google from "./google.png"
import facebook from "./facebook.png"
import yandex from "./yandex.png"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext';

function AuthorizationWindow() {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [accessToken, setAccessToken] = useState(""); // сохраняем токен
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [expire, setExpire] = useState(""); // сохраняем дату
  const [errorLogin, setErrorLogin] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const navigate = useNavigate();
  const { setAuthInfo } = useContext(AuthContext);



  const handleInputChange = (event:any) => {
    const value = event.target.value;
    setLogin(value);
    setIsButtonActive(value !== "" && password !== "");
  };

  const handlePasswordChange = (event:any) => {
    const value = event.target.value;
    setPassword(value);
    setIsButtonActive(value !== "" && login !== "");
    
  };

  const handleButtonClick = () => {
    fetch('https://gateway.scan-interfax.ru/api/v1/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: login,
        password: password
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при выполнении запроса');
        }
      })
      .then(data => {
        // console.log(data); // Вывод данных ответа в консоль
        setAccessToken(data.accessToken); // Сохранение токена в состоянии
        // console.log(accessToken)
        setExpire(data.expire); // Сохранение срока истечения в состоянии
        // console.log(expire)
// ===========================================================================================
// данные для определения авторизованного пользователя 
        const authInfo = {
          isAuthenticated: data.accessToken !== "",
          token: data.accessToken,
          expire: data.expire
        };
        // console.log(authInfo);
        setAuthInfo(authInfo); // передаем в глобальную переменную
// ===========================================================================================
        navigate('/');
        
      })


      .catch(error => {
        console.error('Ошибка при выполнении запроса:', error);
        setErrorLogin(true);
        setErrorPassword(true);
      });
  };

  return (
    <div className="authorization_window">
      <div className="authorization_window__log-register">
        <button className="authorization_window__log-register_log">Войти</button>
        <button className="authorization_window__log-register_register">Зарегистрироваться</button>
      </div>
      <div className="authorization_window__inputs">
        <span>Логин или номер телефона:</span>
        <input type="text" value={login} onChange={handleInputChange} />
        <div className='authorization_window__inputs-p'>{errorLogin && <p>Введите корректные данные</p>}</div>
        
        <span>Пароль:</span>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <div className='authorization_window__inputs-p'>{errorPassword && <p>Неправильный пароль</p>}</div>

        <button disabled={!isButtonActive} onClick={handleButtonClick}>Войти</button>
        <a href=".">Восстановить пароль</a>
      </div>
      <div className="authorization_window__login-via">Войти через:
        <div>
          <button><img src={google} alt="" /></button>
          <button><img src={facebook} alt="" /></button>
          <button><img src={yandex} alt="" /></button>
        </div>
      </div>
    </div>
  );
}

export default AuthorizationWindow;