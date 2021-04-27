import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import Home from './components/Home';
import Login from './components/Login';
import Cookies from "js-cookie";
import Navbar from "./components/Navbar";
import TenantDashboard from "./components/TenantDashboard";

export const light = {
  palette: {
    type: 'light',
    primary: {
      main: '#222629',
      mainSecondary: '#474b4f'
    },
    secondary: {
      main: '#43a047',
    },
  },
  typography: {
    color: '#000000'
  }
}

function PrivateRoute({ component: Component, authed, userid, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <Component {...props} authed={authed} userid={userid} />
        ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
      }
    />
  );
}

function App(props) {
  const appliedTheme = createMuiTheme(light);
  const userid = Cookies.get("userid");
  const authed = userid !== undefined;


  return (
    <ThemeProvider theme={appliedTheme}>
      <BrowserRouter>
        <Navbar authed={authed} />
        <Switch>
          <Route exact path='/' render={(props) => <Redirect to={'/login'} />} />
          <Route exact path='/login' render={(props) => <Login {...props} />} />
          {/* <Route exact path='/dashboard' render={() => <Home />} /> */}
          <PrivateRoute
            exact
            path="/dashboard"
            authed={authed}
            userid={userid}
            component={Home}
          />
          <PrivateRoute
            exact
            path="/history"
            authed={authed}
            userid={userid}
            component={TenantDashboard}
          />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default (App);
