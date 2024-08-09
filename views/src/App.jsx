// import { Login } from "./components/Pages/Login/Login"
import { Register } from "./components/Pages/Register/Register";
import { Employees } from "./components/Pages/Register/Employees";
import { Route, Switch } from "wouter";
import { AppContextProvider } from "./contexts/app.context";
import { Twoverific } from "./components/Pages/Twoverific/Twoverific";
// import { Users } from "./components/Pages/Users/Users"
import { Admin } from "./components/Pages/Register/Admin";
import { LoginEmpleados } from "./components/Pages/Login/Loginempleados";
import { LoginAdmin } from "./components/Pages/Login/Loginadmin";
import { Home } from "./components/Pages/Home/Home";
import { Asistence } from "./components/Pages/Asistence/Asistence";
import { Registerlist } from "./components/Pages/Registerlist/Registerlist";
import { Clients } from "./components/Pages/Register/Clients";
import { ProfileAdmin } from "./components/Pages/Profiles/ProfileAdmin";
import { ProfileEmployee } from "./components/Pages/Profiles/ProfileEmployee";
import { ProfileUsers } from "./components/Pages/Profiles/ProfileUsers";

function App() {
  return (
    <AppContextProvider>
      <div className="min-h-screen max-w-[1920px] mx-auto w-full flex flex-col ">
        <Switch>
          <Route path="/loginadmin">
            <LoginAdmin />
          </Route>
          <Route path="/profile/users">
            <ProfileUsers />
          </Route>
          <Route path="/profile/employee">
            <ProfileEmployee />
          </Route>
          <Route path="/profile/admin">
            <ProfileAdmin />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/registeredemployeed">
            <Employees />
          </Route>
          <Route path="/loginempleados">
            <LoginEmpleados />
          </Route>
          <Route path="/registeredlist">
            <Registerlist />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/asitencia">
            <Asistence />
          </Route>
          <Route path="/createusers">
            <Clients />
          </Route>
          <Route path="/createadmin">
            <Admin />
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
  );
}

export default App;
