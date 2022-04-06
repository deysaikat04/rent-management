import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import Home from "./components/Home";
import Login from "./components/Login";
import Cookies from "js-cookie";
import TenantDashboard from "./components/TenantDashboard";
import Bar from "./components/Navbar";

export const light = {
  palette: {
    type: "light",
    primary: {
      main: "#222629",
      mainSecondary: "#474b4f",
    },
    secondary: {
      main: "#43a047",
    },
  },
  typography: {
    color: "#000000",
  },
};

function PrivateRoute({ component: Component, authed, userid, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <>
            <Component {...props} {...rest} authed={authed} userid={userid} />
          </>
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

  const [dialogState, setDialogState] = React.useState({
    shouldOpen: false,
    dialogType: "",
  });

  const handleDialogState = (type, shouldOpen) => {
    setDialogState({
      shouldOpen,
      dialogType: type,
    });
  };

  return (
    <ThemeProvider theme={appliedTheme}>
      <BrowserRouter>
        <Bar
          authed={authed}
          dialogState={dialogState}
          handleDialogState={handleDialogState}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Redirect to={"/login"} />}
          />
          <Route exact path="/login" render={(props) => <Login {...props} />} />
          <PrivateRoute
            exact
            path="/dashboard"
            authed={authed}
            userid={userid}
            dialogState={dialogState}
            handleDialogState={handleDialogState}
            component={Home}
          />
          <PrivateRoute
            exact
            path="/history"
            authed={authed}
            userid={userid}
            dialogState={dialogState}
            handleDialogState={handleDialogState}
            component={TenantDashboard}
          />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
