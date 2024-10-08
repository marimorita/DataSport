import React, { useContext, useRef, useState, useEffect } from 'react'
import { StateContext } from './components/Context/Context';
import { toast, ToastContainer } from "react-toastify";
import { axiosInstance } from "../axiosConfig";
// import { Login } from "./components/Pages/Login/Login"
 import { Register } from "./components/Pages/Register/Register"
import { Employees } from "./components/Pages/Register/Employees"
import { Route, Switch } from "wouter"
import { AppContextProvider } from "./contexts/app.context"
import { useLocation } from 'wouter'

import { TwoverificAdmin } from "./components/Pages/Twoverific/TwoVerificAdmin"
import { TwoverificEmployee } from "./components/Pages/Twoverific/TwoVerificEmployee"
// import { Users } from "./components/Pages/Users/Users"

import { Admin } from "./components/Pages/Register/Admin"
import { LoginEmpleados } from "./components/Pages/Login/Loginempleados"
import { LoginAdmin } from "./components/Pages/Login/Loginadmin"
import { Home } from "./components/Pages/Home/Home"
import { HomeAdmin } from "./components/Pages/Home/HomeAdmin"
import { HomeEmployee } from "./components/Pages/Home/HomeEmployee"


import { ProfileAdmin } from "./components/Pages/Profiles/ProfileAdmin";
import { ProfileEmployee } from "./components/Pages/Profiles/ProfileEmployee";
import { ProfileUsers } from "./components/Pages/Profiles/ProfileUsers";

import { Asistence } from "./components/Pages/Asistence/Asistence"
import { Registerlist } from "./components/Pages/Registerlist/Registerlist"
import { Clients } from "./components/Pages/Register/Clients"
import { AuthProvider } from "./components/Context/AuthContext"
import { ProtectedRoute } from "./components/Context/ProtectectRoutes"
import { Inventory } from './components/Pages/Inventory/Inventory';
import { Observations } from './components/Pages/Observations/Observations';
import { Modal404 } from './components/Modals/Modal404/Modal404';
// import { ModalTestPage } from './components/Pages/WorkingTeam/WorkingTeam';



function App() {
  const { userObservation, setUserObservation } = useContext(StateContext);
  const [routeEmployee, setRouteEmployee] = useState(localStorage.getItem('routeE') || '');
  const [routeAdmin, setRouteAdmin] = useState(localStorage.getItem('routeA') || '');
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const storedRouteE = localStorage.getItem('routeE');
    if (storedRouteE !== routeEmployee) {
      setRouteEmployee(storedRouteE);
    }
  }, [routeEmployee]);

  useEffect(() => {
    const storedRouteA = localStorage.getItem('routeA');
    if (storedRouteA !== routeAdmin) {
      setRouteAdmin(storedRouteA);
    }
  }, [routeAdmin]);

  console.log("esta en App", routeEmployee);

  const token = localStorage.getItem("token");
  console.log("token",token);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axiosInstance.get(
          `/administrator/administrator/${token}`
        );
        // console.log(response.data);

        setUserObservation([response.data]);
      } catch (error) {
        toast.error(error.response, {
          progressStyle: {
            backgroundColor: "#692FDB", // Color de la barra de carga
          },
        });
      }
    };

    fetchAdmin();
  }, [setUserObservation]);
  

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axiosInstance.get(
          `/employees/employee/token/${token}`
        );
        // console.log(response.data);

        setUserObservation([response.data]);
      } catch (error) {
        toast.error(error.response, {
          progressStyle: {
            backgroundColor: "#692FDB", // Color de la barra de carga
          },
        });
      }
    };

    fetchAdmin();
  }, [setUserObservation]);
  

  

  console.log("hola",userObservation);
  return (
    <AuthProvider>
      <AppContextProvider>
        <div className="min-h-screen max-w-[1920px] mx-auto w-full flex flex-col ">
          <Switch>
            {/* Protectec Routes */}
            {routeAdmin && (
              <>
                <ProtectedRoute path={`/HJQL9823/${routeAdmin}/home`} allowedRoles={['admin']}>
                  <HomeAdmin />
                </ProtectedRoute>
                <ProtectedRoute path={`/HJQL9823/${routeAdmin}/profile/A`} allowedRoles={['admin']}>
                  <ProfileAdmin />
                </ProtectedRoute>
                <ProtectedRoute path={`/HJQL9823/${routeAdmin}/registeredlist`} allowedRoles={['admin']}>
                  <Registerlist nabvar={'admin'} Location={`/HJQL9823/${routeAdmin}/home`} LocationProfile={`/HJQL9823/${routeAdmin}/profile/U`} LocationRegisterUser={`/HJQL9823/${routeAdmin}/register/user`} LocationRegisterEmployee={`/HJQL9823/${routeAdmin}/register/employeed`} />
                </ProtectedRoute>
                <ProtectedRoute path={`/HJQL9823/${routeAdmin}/assistance`} allowedRoles={['admin']}>
                  <Asistence nabvar={'admin'} Location={`/HJQL9823/${routeAdmin}/home`} />
                </ProtectedRoute>

                <ProtectedRoute path={`/HJQL9823/${routeAdmin}/inventory`} allowedRoles={['admin']}>
                  <Inventory nabvar={'admin'} />
                </ProtectedRoute>

                <ProtectedRoute path={`/HJQL9823/${routeAdmin}/observation`} allowedRoles={['admin']}>
                  <Observations nabvar={'admin'} />
                </ProtectedRoute>

                <ProtectedRoute path={`/HJQL9823/${routeAdmin}/profile/U`} allowedRoles={['admin']}>
                  <ProfileUsers Location={`/HJQL9823/${routeAdmin}/profile/U`} />
                </ProtectedRoute>
                <ProtectedRoute path={`/HJQL9823/${routeAdmin}/register/user`} allowedRoles={['admin']}>
                  <Clients Location={`/HJQL9823/${routeAdmin}/registeredlist`} />
                </ProtectedRoute>
                <ProtectedRoute path={`/HJQL9823/${routeAdmin}/register/employeed`} allowedRoles={['admin']}>
                  <Employees Location={`/HJQL9823/${routeAdmin}/registeredlist`} />
                </ProtectedRoute>
              </>
            )}
            {routeEmployee && (
              <>
                <ProtectedRoute path={`/KQWJ7482/${routeEmployee}/home`} allowedRoles={['employee']}>
                  <HomeEmployee />
                </ProtectedRoute>
                <ProtectedRoute path={`/KQWJ7482/${routeEmployee}/profile/E`} allowedRoles={['employee']}>
                  <ProfileEmployee Location={`/KQWJ7482/${routeEmployee}/home`} />
                </ProtectedRoute>
                <ProtectedRoute path={`/KQWJ7482/${routeEmployee}/registeredlist`} allowedRoles={['employee']}>
                  <Registerlist nabvar={'employee'} notAccess={false} Location={`/KQWJ7482/${routeEmployee}/home`} LocationProfile={`/KQWJ7482/${routeEmployee}/profile/U`} LocationRegisterUser={`/KQWJ7482/${routeEmployee}/register/user`} />
                </ProtectedRoute>
                <ProtectedRoute path={`/KQWJ7482/${routeEmployee}/assistance`} allowedRoles={['employee']}>
                  <Asistence nabvar={'employee'} Location={`/KQWJ7482/${routeEmployee}/home`} />
                </ProtectedRoute>

                <ProtectedRoute path={`/KQWJ7482/${routeEmployee}/inventory`} allowedRoles={['employee']}>
                  <Inventory nabvar={'employee'} />
                </ProtectedRoute>

                <ProtectedRoute path={`/KQWJ7482/${routeEmployee}/observation`} allowedRoles={['employee']}>
                  <Observations nabvar={'employee'} />
                </ProtectedRoute>

                <ProtectedRoute path={`/KQWJ7482/${routeEmployee}/profile/U`} allowedRoles={['employee']}>
                  <ProfileUsers Location={`/KQWJ7482/${routeEmployee}/profile/U`} />
                </ProtectedRoute>
                <ProtectedRoute path={`/KQWJ7482/${routeEmployee}/register/user`} allowedRoles={['employee']}>
                  <Clients Location={`/KQWJ7482/${routeEmployee}/registeredlist`} />
                </ProtectedRoute>
              </>
            )}

            {/* <ProtectedRoute path="/registeredlist" allowedRoles={['admin', 'employee']}>
              <Registerlist />
            </ProtectedRoute> */}
            {/* <ProtectedRoute path="/asitencia" allowedRoles={['admin', 'employee']}>
              <Asistence /
            </ProtectedRoute> */}

            {/* Normal Routes */}

            <Route path={`/`}>
              <Home Location={`/`} />
            </Route>
            <Route path={`/clients`}>
              <Clients Location={`/`} />
            </Route>
            <Route path={`/u`}>
              <Employees Location={`/`} />
            </Route>

            <Route path="/">
              <Registerlist />
            </Route>
            <Route path="/login/HJQL9823">
              <LoginAdmin Location={'/'} />
            </Route>
            <Route path="/twoverific/HJQL9823">
              <TwoverificAdmin />
            </Route>
            <Route path="/login/KQWJ7482">
              <LoginEmpleados />
            </Route>
            <Route path="/twoverific/KQWJ7482">
              <TwoverificEmployee />
            </Route>
            <Route path="/estonoseaccedeporfavor">
              <Admin />
            </Route>
            <Route path="/admin">
              <Register />
            </Route>
            <Route path="/inventory/A">
              <Inventory />
            </Route>
            <Route path="/Observations/A">
              <Observations />
            </Route>
            <Route path={"/404/modal"}>
              <Modal404/>
            </Route>
          </Switch>
        </div>
      </AppContextProvider>
    </AuthProvider>
  )
}

export default App;