import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profiles from './Pages/Profile/Profiles';
import AddProfile from './Pages/Profile/AddProfile'
import UpdateProfile from './Pages/Profile/UpdateProfile'

ReactDOM.render(
  <React.StrictMode>
    <>
      <body>
      <Router>
      <Header />
        <Switch>
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/add-profile' component={AddProfile} />
          <Route exact path='/update-profile/:id' component={UpdateProfile} />

        </Switch>
      </Router>
    </body>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);
