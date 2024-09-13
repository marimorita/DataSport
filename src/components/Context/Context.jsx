import React, { createContext, useState } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [createUser, setCreateUser] = useState(false);
  const [createEmpleyees, setCreateEmpleyees] = useState(false);
  const [createAdmin, setCreateAdmin] = useState(false);
  const [loginEmpleyees, setLoginEmpleyees] = useState(false);
  const [loginAdmin, setLoginAdmin] = useState(false);
  const [modalCreateBienes, setmodalCreateBienes] = useState(false);
  const [modalCreatePoducts, setModalCreatePoducts] = useState(false);
  const [clientsView, setClientsView] = useState([]);
  const [adminView, setAdminView] = useState([]);
  const [employeeView, setEmployeeView] = useState([]);
  const [userView, setUserView] = useState([]);
  const [userDocument, setUserDocument] = useState([]);




  return (
    <StateContext.Provider value={{ createUser, setCreateUser, createEmpleyees, setCreateEmpleyees, loginEmpleyees, setLoginEmpleyees, clientsView, setClientsView, loginAdmin, setLoginAdmin, createAdmin, setCreateAdmin, adminView, setAdminView, employeeView, setEmployeeView, userView, setUserView, userDocument, setUserDocument, modalCreateBienes, setmodalCreateBienes, modalCreatePoducts, setModalCreatePoducts}}>
      {children}
    </StateContext.Provider>
  );
};