// import { Login } from "./components/Pages/Login/Login"
// import { Register } from "./components/Pages/Register/Register"
import { Employees } from "./components/Pages/Register/Employees"
import { Route, Switch } from "wouter"
import { AppContextProvider } from "./contexts/app.context"

import { Twoverific } from "./components/Pages/Twoverific/Twoverific"
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



function App() {
  return (
    <AuthProvider>
      <AppContextProvider>
        <div className="min-h-screen max-w-[1920px] mx-auto w-full flex flex-col ">
          <Switch>
            {/* Protectec Routes */}
            <ProtectedRoute path="/admin/home" allowedRoles={['admin']}>
              <HomeAdmin />
            </ProtectedRoute>
            <ProtectedRoute path="/employee/home" allowedRoles={['employee']}>
              <HomeEmployee />
            </ProtectedRoute>
            
            <ProtectedRoute path="/profile/A" allowedRoles={['admin']}>
              <ProfileAdmin />
            </ProtectedRoute>
            <ProtectedRoute path="/profile/E" allowedRoles={['admin', 'employee']}>
              <ProfileEmployee />
            </ProtectedRoute>
            <ProtectedRoute path="/profile/U" allowedRoles={['admin', 'employee']}>
              <ProfileUsers />
            </ProtectedRoute>

            <ProtectedRoute path="/registeredemployeed" allowedRoles={['admin']}>
              <Employees />
            </ProtectedRoute>
            <ProtectedRoute path="/registeredlist" allowedRoles={['admin', 'employee']}>
              <Registerlist />
            </ProtectedRoute>
            <ProtectedRoute path="/asitencia" allowedRoles={['admin', 'employee']}>
              <Asistence />
            </ProtectedRoute>

            <ProtectedRoute path="/createusers" allowedRoles={['admin', 'employee']}>
              <Clients />
            </ProtectedRoute>
            <ProtectedRoute path="/createadmin" allowedRoles={['admin', 'employee']}>
              <Admin />
            </ProtectedRoute>

            {/* Normal Routes */}


            <Route path="/login">
              <LoginAdmin />
            </Route>
            <Route path="/loginempleados">
              <LoginEmpleados />
            </Route>
            <Route path="/">
              <Home />
            </Route>

            <Route path="/twoverific">
              <Twoverific />
            </Route>
            <Route>
              <div>404: No such page</div>
            </Route>
          </Switch>
        </div>
      </AppContextProvider>
    </AuthProvider>
  )
}

export default App;
