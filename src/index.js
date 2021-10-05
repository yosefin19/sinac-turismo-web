import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Users from './Pages/User/Users';
import AddUser from './Pages/User/AddUser';
import UpdateUser from './Pages/User/UpdateUser';

ReactDOM.render(
  <React.StrictMode>
    <>
      <body>
      <Router>
      <Header />
        <Switch>
          <Route exact path='/users' component={Users} />
          <Route exact path='/add-user' component={AddUser} />
          <Route exact path='/update-user/:id'  component={UpdateUser} />
        </Switch>
      </Router>
    </body>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);
