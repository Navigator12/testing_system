import React, {useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import { userRoutes } from "./routes";
import AuthContext from "./contexts/Auth";
import useAuth from "./hooks/Auth";

const App = () => {
  const { login, logout, token, userId, isTeacher, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = userRoutes(isAuthenticated, isTeacher);

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, isTeacher
    }}>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
