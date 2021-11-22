import {Redirect, Route, useLocation} from "react-router-dom";
import useAuthentication from "../authentication/useAuthentication";

export default function PrivateRoute({component: Component, ...rest}) {

    const authentication = useAuthentication();
    const location = useLocation()

    return (
        <Route {...rest}>
            {authentication.logged() ? (
                <Component/>
            ) : (
                <Redirect to={{pathname: "/login", state: {from: location}}}/>
            )}
        </Route>
    )
}
