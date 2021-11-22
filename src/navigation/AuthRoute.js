import {Redirect, Route,} from "react-router-dom";
import useAuthentication from "../authentication/useAuthentication";

export default function AuthRoute({component: Component, ...rest}) {

    const authentication = useAuthentication();

    return (
        <Route {...rest}>
            {!authentication.logged() ? (
                <Component/>
            ) : (
                <Redirect to="/menu"/>
            )}
        </Route>
    )
}
