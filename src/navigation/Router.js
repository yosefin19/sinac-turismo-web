import {HashRouter, Route, Switch} from "react-router-dom";
import Error404 from "../pages/errors/Error404";
import Menu from "../pages/Menu";
import ConservationArea from "../pages/ConservationArea"
import TouristDestination from "../pages/TouristDestination";
import AddTouristDestination from "../components/tourist-destination/AddTouristDestination";
import ManagerTouristDestination from "../components/tourist-destination/ManagerTouristDestination";
import AddConservationArea from "../components/conservationarea/AddConservationArea";
import ManageConservationArea from "../components/conservationarea/ManageConservationArea";


const Router = () => {
    return(
            <HashRouter>
                <Switch base="sinac-turismo">
                   <Route exact path="/" component={Menu}/>
                   <Route exact path="/menu" component={Menu}/>
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