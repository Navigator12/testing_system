import React from "react";
import { BrowserRouter } from "react-router-dom";
import { userRoutes } from "./routes";

const App = () => {
  const routes = userRoutes(0, 0);

  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  );
};

export default App;
