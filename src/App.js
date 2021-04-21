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
        <Route exact path='/' render={(props) => <Home {...props} />} />
        <Route exact path='/tenant/:id' render={(props) => <TenantDashboard {...props} />} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
