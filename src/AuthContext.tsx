// AuthContext.js


import React, { createContext, useState } from 'react';

interface AuthInfo {
  isAuthenticated: boolean;
  token: string;
  expire: string;
}

interface AuthContextProps {
  authInfo: AuthInfo;
  setAuthInfo: (authInfo: AuthInfo) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  authInfo: {
    isAuthenticated: false,
    token: '',
    expire: '',
  },
  setAuthInfo: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    isAuthenticated: false,
    token: '',
    expire: '',
  });


//   console.log('+++++++++ПРОВЕРКА++++++++++++  authInfo:', authInfo);
//   console.log('---------ПРОВЕРКА------------  setAuthInfo  :', setAuthInfo);


  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};