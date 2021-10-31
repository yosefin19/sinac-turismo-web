import {HashRouter, Route, Switch} from "react-router-dom";
import Error404 from "../pages/errors/Error404";
import Menu from "../pages/Menu";
import ConservationArea from "../pages/ConservationArea"
import TouristDestination from "../pages/TouristDestination";
import AddTouristDestination from "../components/tourist-destination/AddTouristDestination";
import ManagerTouristDestination from "../components/tourist-destination/ManagerTouristDestination";
import AddConservationArea from "../components/conservationarea/AddConservationArea";
import ManageConservationArea from "../components/conservationarea/ManageConservationArea";
import Users from "../Pages/User/Users";
import AddUser from "../Pages/User/AddUser";
import UpdateUser from "../Pages/User/UpdateUser";
import Profiles from "../Pages/Profile/Profiles";
import AddProfile from "../Pages/Profile/AddProfile";
import UpdateProfile from "../Pages/Profile/UpdateProfile";
import React from "react";


const Router = () => {
    return (
        <HashRouter>

            <Switch base="sinac-turismo">
                <Route exact path="/" component={Menu}/>
                <Route exact path="/menu" component={Menu}/>
                <Route exact path='/users' component={Users}/>
                <Route exact path='/add-user' component={AddUser}/>
                <Route exact path='/update-user/:id' component={UpdateUser}/>
                <Route exact path='/profiles' component={Profiles}/>
                <Route exact path='/add-profile' component={AddProfile}/>
                <Route exact path='/update-profile/:id' component={UpdateProfile}/>
                <Route exact path="/conservation-area" component={ConservationArea}/>
                <Route exact path="/conservation-area/add" component={AddConservationArea}/>
                <Route exact path="/conservation-area/:id" component={ManageConservationArea}/>
                <Route exact path="/tourist-destination" component={TouristDestination}/>
                <Route exact path="/tourist-destination/add" component={AddTouristDestination}/>
                <Route exact path="/tourist-destination/:id" component={ManagerTouristDestination}/>
                <Route path="*" component={Error404}/>
            </Switch>
        </HashRouter>
    );
};

export default Router;