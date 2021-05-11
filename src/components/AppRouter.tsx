import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import ToDo from "../pages/ToDo/index";
import Favorites from "../pages/Favorites";
import Home from '../pages/Home';

const AppRouter = () => {
  return (
    <Fragment>
      <Route exact path="/" component={Home} />
      <Route path="/todo" component={ToDo} />
      <Route path="/favorites" component={Favorites} />
    </Fragment>
  );
};

export default AppRouter;
