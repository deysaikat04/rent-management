import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TenantDashboard from './components/TenantDashboard';

function App() {
  return (
    <BrowserRouter>

      <Navbar />
      <Switch>
        <Route exact path='/' render={() => <Home />} />
        <Route exact path='/tenant' render={() => <TenantDashboard />} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
