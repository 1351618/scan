import React, { createContext, useState, useEffect } from 'react';

interface AuthInfo {
  isAuthenticated: boolean;
  token: string;
  expire: string;
}

interface AuthContextProps {
  authInfo: AuthInfo;
  setAuthInfo: (authInfo: AuthInfo) => void;
}

interface PublicationIdsContextProps {
  publicationIds: { publicationIds: string[]; searchSuccessful: boolean };
  setPublicationIds: (publicationIds: { publicationIds: string[]; searchSuccessful: boolean }) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  authInfo: {
    isAuthenticated: false,
    token: '',
    expire: '',
  },
  setAuthInfo: () => {},
});

export const PublicationIdsContext = createContext<PublicationIdsContextProps>({
  publicationIds: { publicationIds: [], searchSuccessful: false },
  setPublicationIds: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>(() => {
    const storedAuthInfo = localStorage.getItem('authInfo');
    if (storedAuthInfo) {
      return JSON.parse(storedAuthInfo);
    }
    return {
      isAuthenticated: false,
      token: '',
      expire: '',
    };
  });

  const [publicationIds, setPublicationIds] = useState<{ publicationIds: string[]; searchSuccessful: boolean }>(() => {
    const storedPublicationIds = localStorage.getItem('publicationIds');
    if (storedPublicationIds) {
      return JSON.parse(storedPublicationIds);
    }
    return {
      publicationIds: [],
      searchSuccessful: false,
    };
  });

  useEffect(() => {
    localStorage.setItem('authInfo', JSON.stringify(authInfo));
    localStorage.setItem('publicationIds', JSON.stringify(publicationIds));
    // console.log('authInfo:', authInfo);
    // console.log('publicationIds:', publicationIds);
  }, [authInfo, publicationIds]);

  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
      <PublicationIdsContext.Provider value={{ publicationIds, setPublicationIds }}>
        {children}
      </PublicationIdsContext.Provider>
    </AuthContext.Provider>
  );
};