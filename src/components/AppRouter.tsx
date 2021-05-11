import React, { useState, Fragment } from "react";
import { Route } from "react-router-dom";
import ToDo from "../pages/ToDo/index";
import Nav from "../components/Nav";
import Favorites from "../pages/Favorites";

const AppRouter = () => {
  return (
    <Fragment>
      <Route path="/todo" component={ToDo} />
      <Route path="/favorites" component={Favorites} />
    </Fragment>
  );
};

export default AppRouter;
