import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userCity, setUserCity] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userCity,
        setUserCity,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export { useAuthContext, AuthProvider };
