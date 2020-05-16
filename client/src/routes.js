import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";

export const userRoutes = (isAuthenticated, isTeacher) => {
  if (isAuthenticated) {
    if (isTeacher) {
      return (
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>

          <Redirect to="/" />
        </Switch>
      )
    }

    else return (
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>

        <Redirect to="/" />
      </Switch>
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
