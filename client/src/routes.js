import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import ContestBuilder from "./pages/ContestBuilder";
import ShowContest from "./pages/ShowContest";
import {ContestList} from "./pages/ContestListPage/ContestList";

export const userRoutes = (isAuthenticated, isTeacher) => {
  return <Switch>
    {!isAuthenticated && <Route exact path='/' component={LoginPage} />}
    {!isAuthenticated && <Route exact path='/register' component={RegisterPage} />}
    {isAuthenticated && <Route exact path='/' component={MainPage} />}
    {isAuthenticated && <Route exact path='/contests' component={ContestList} />}
    {isTeacher && <Route exact path='/contest/builder' component={ContestBuilder} /> }
    {isAuthenticated && <Route path='/contest/:id' component={ShowContest} /> }
  </Switch>
};
