import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TenantDashboard from './components/TenantDashboard';

export const light = {
  palette: {
    type: 'light',
    primary: {
      main: '#222629',
      mainSecondary: '#474b4f'
    },
    secondary: {
      main: '#86c232',
    },
  },
  typography: {
    color: '#000000'
  }
}

function App() {
  const appliedTheme = createMuiTheme(light);
  return (
    <ThemeProvider theme={appliedTheme}>
      <BrowserRouter>

        <Navbar />
        <Switch>
          <Route exact path='/' render={(props) => <Home {...props} />} />
          <Route exact path='/tenant/:id' render={(props) => <TenantDashboard {...props} />} />

        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
