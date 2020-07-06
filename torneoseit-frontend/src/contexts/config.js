import React, { createContext, useState } from 'react';

export const ConfigContext = createContext(undefined);

const ConfigProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(false);

  return (
    <ConfigContext.Provider
      value={{
        token,
        userType,
        user,
        setToken,
        setUserType,
        setUser,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
