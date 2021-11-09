import {HashRouter, Route, Switch} from "react-router-dom";
import Error404 from "../pages/errors/Error404";
import Menu from "../pages/Menu";
import ConservationArea from "../pages/conservationarea/ConservationArea"
import TouristDestination from "../pages/touristdestination/TouristDestination";
import AddTouristDestination from "../components/tourist-destination/AddTouristDestination";
import ManagerTouristDestination from "../components/tourist-destination/ManagerTouristDestination";
import AddConservationArea from "../components/conservationarea/AddConservationArea";
import ManageConservationArea from "../components/conservationarea/ManageConservationArea";
import Users from "../pages/user/Users";
import AddUser from "../pages/user/AddUser";
import UpdateUser from "../pages/user/UpdateUser";
import Profiles from "../pages/profile/Profiles";
import AddProfile from "../pages/profile/AddProfile";
import UpdateProfile from "../pages/profile/UpdateProfile";
import React from "react";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";
import ResetPassword from "../pages/ResetPassword";


const Router = () => {

    return (
        <HashRouter>

            <Switch base="sinac-turismo">
                <PrivateRoute exact path="/" component={Menu}/>
                <AuthRoute exact path="/login" component={Login}/>
                <AuthRoute exact path="/reset-password" component={ResetPassword}/>
                <PrivateRoute exact path="/menu" component={Menu}/>
                <PrivateRoute exact path='/users' component={Users}/>
                <PrivateRoute exact path='/add-user' component={AddUser}/>
                <PrivateRoute exact path='/update-user/:id' component={UpdateUser}/>
                <PrivateRoute exact path='/profiles' component={Profiles}/>
                <PrivateRoute exact path='/add-profile' component={AddProfile}/>
                <PrivateRoute exact path='/update-profile/:id' component={UpdateProfile}/>
                <PrivateRoute exact path="/conservation-area" component={ConservationArea}/>
                <PrivateRoute exact path="/conservation-area/add" component={AddConservationArea}/>
                <PrivateRoute exact path="/conservation-area/:id" component={ManageConservationArea}/>
                <PrivateRoute exact path="/tourist-destination" component={TouristDestination}/>
                <PrivateRoute exact path="/tourist-destination/add" component={AddTouristDestination}/>
                <PrivateRoute exact path="/tourist-destination/:id" component={ManagerTouristDestination}/>
                <Route path="*" component={Error404}/>
            </Switch>
        </HashRouter>
    );
};

export default Router;