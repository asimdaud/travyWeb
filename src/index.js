import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";

import Login from "views/examples/Login.jsx";
import Profile from "views/examples/Profile.jsx";
import Register from "views/examples/Register.jsx";
import Timeline from "views/examples/Timeline.jsx";
import EditProfile from "views/examples/EditProfile";
import PrivateRoute from "./privateRoute";

import FriendsPage from "views/examples/FirendsPage";
// import Maps from "views/examples/Maps.jsx";
// import Maps2 from "views/examples/Maps2";
import Loc from "views/examples/location";
import Chat from "views/examples/chat";

import Location2 from "views/examples/location2";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      
      <Route
        path="/location2"
        exact
        render={props => <Location2 {...props} />}
/>
      <PrivateRoute
        path="/loc"
        exact
        render={props => <Loc {...props} />}
      />
      <Route path="/login" exact render={props => <Login {...props} />} 
      />
      <PrivateRoute
        path="/profile"
        render={props => <Profile {...props} />}
        exact
      />
      <PrivateRoute
        path="/edit-profile"
        render={props => <EditProfile {...props} />}
        exact
      />
      <Route path="/register" exact render={props => <Register {...props} />} />
      <Route path="/postLoc" exact render={props => <postLoc {...props} />} />
       <PrivateRoute
        path="/chat"
        exact
        render={props => <Chat {...props} />}
      />
      <PrivateRoute
        path="/friendspage"
        render={props => <FriendsPage {...props} />}
        exact
      />
      <PrivateRoute
        path="/timeline"
        render={props => <Timeline {...props} />}
        exact
      />
      <Redirect to="/login"  />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
