import React, { createContext, useState } from 'react';

export const ConfigContext = createContext(undefined);

const ConfigProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);

  return (
    <ConfigContext.Provider
      value={{
        token,
        userType,
        setToken,
        setUserType,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
