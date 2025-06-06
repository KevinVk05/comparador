import React, { createContext, useContext, useState } from 'react';
import UseStorageState from "../servicios/storage/UseStorageState";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = UseStorageState("usuario",null);
  const [esAdmin, setEsAdmin] = UseStorageState("esAdmin", false)

  const login = (userData) => setUser(userData);
  const logout = () => {setUser(null), setEsAdmin(false)};
  const admin = (userData) => setEsAdmin(userData)

  return (
    <AuthContext.Provider value={{ user, login, logout, esAdmin, admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
