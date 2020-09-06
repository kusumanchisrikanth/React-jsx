import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getuser } from "../../services/authservice";

const Protectedroute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        // console.log(props);
        if (!getuser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default Protectedroute;
