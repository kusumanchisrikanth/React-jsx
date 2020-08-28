import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import Notfound from "./components/notfound";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Navbar from "./components/navbar";
import MovieForm from "./components/movieform";
import Login from "./components/loginform";
import Register from "./components/registeration";

import "./App.css";
function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/movies/:id" component={MovieForm} />
        <Route path="/movies" component={Movies} />
        <Route path="/notfound" component={Notfound} />
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Redirect from="/" exact to="/movies" />
        <Redirect exact to="/notfound" />
      </Switch>
    </div>
  );
}

export default App;
