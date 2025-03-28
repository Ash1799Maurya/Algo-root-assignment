/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext({});


export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  
  const signUp = async (email) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    const mockUser = { id: 'mock-user-id', email };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const signIn = async (email) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser = { id: 'mock-user-id', email };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const signOut = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(null);
    localStorage.removeItem('user');
  };

  const deleteAccount = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(null);
    localStorage.removeItem('user');
  };

 
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};
