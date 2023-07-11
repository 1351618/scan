import React, { useContext } from 'react';
import './account_login.css';
import rectangle from "./rectangle.png"
import FotoUser from "./foto_user.png"
import { AuthContext } from '../../../../AuthContext';

function AccountLogin() {
  const { authInfo, setAuthInfo } = useContext(AuthContext);

  // Обработчик для кнопки выхода (logout)
  const handleLogout = () => {
    // Сбрасываем данные авторизации в начальное состояние
    setAuthInfo({
      isAuthenticated: false,
      token: '',
      expire: '',
    });
  };

  return (
    <div className="account-login">
      {/* Блок для неавторизованных пользователей */}
      <div
        className="account-login__content"
        style={{ display: authInfo.isAuthenticated ? 'none' : '' }}
      >
        {/* Кнопка "Зарегистрироваться" */}
        <button className="account-login__content-register">Зарегистрироваться</button>
        <img src={rectangle} alt="" style={{ height: "26px" }} />
        {/* Кнопка "Войти" */}
        <button className="account-login__content-login">
          <a href="/authorization">Войти</a>
        </button>
      </div>

      {/* Блок для авторизованных пользователей */}
      <div
        className="account-login__user"
        style={{ display: authInfo.isAuthenticated ? '' : 'none' }}
      >
        <div className="account-login__name-exit">
          {/* Отображение имени пользователя */}
          <p>Алексей А.</p>
          {/* Кнопка "Выйти" */}
          <button className="account-login__name-exit_exit" onClick={handleLogout}>
            Выйти
          </button>
        </div>
        {/* Отображение фото пользователя */}
        <img className="account-login__name-exit_photo" src={FotoUser} alt="" />
      </div>
    </div>
  );
}

export default AccountLogin;