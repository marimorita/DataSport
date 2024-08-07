import React, { createContext, useState } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [createUser, setCreateUser] = useState(false);
  const [createEmpleyees, setCreateEmpleyees] = useState(false);
  const [createAdmin, setCreateAdmin] = useState(false);
  const [loginEmpleyees, setLoginEmpleyees] = useState(false);
  const [loginAdmin, setLoginAdmin] = useState(false);
  const [clientsView, setClientsView] = useState([]);

  return (
    <StateContext.Provider value={{ createUser, setCreateUser, createEmpleyees, setCreateEmpleyees, loginEmpleyees, setLoginEmpleyees, clientsView, setClientsView, loginAdmin, setLoginAdmin, createAdmin, setCreateAdmin }}>
      {children}
    </StateContext.Provider>
  );
};