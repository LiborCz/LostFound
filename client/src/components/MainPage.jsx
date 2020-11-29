import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { createBrowserHistory as history } from "history";
import { ProtectedRoute } from "../system/protected.route";
import { AuthContext } from "../system/context/AuthContext";


import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";

function Main() {

  const [user] = React.useContext(AuthContext);

  console.log("auth: " + user.howLong());

  return (
    <div className="hero is-fullheight-with-navbar">
      <Router history={history}>
        <Switch>
          {/* <Route path="/" exact component={LoginPage} /> */}
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          {user.isAuthenticated() ? 
            <ProtectedRoute component={HomePage} /> :
            <LoginPage />
          }
          {/* <ProtectedRoute path="/home" exact component={HomePage} /> */}
          {/* <ProtectedRoute path="/profile" component={ProfilePage} /> */}
        </ Switch>
      </Router>
    </div>
  );
}

export default Main;