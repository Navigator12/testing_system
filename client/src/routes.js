import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export const userRoutes = (isAuthenticated, isTeacher = false) => {
  if (isAuthenticated) {
    if (isTeacher) {
      return (
        <></>
      )
    }

    else return (
      <></>
    )
  }

  return (
    <Switch>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Route path="/register" exact>
        <RegisterPage />
      </Route>

      <Redirect to="/login" />
    </Switch>
  );
};
