import {useContext} from "react";
import {AuthenticationContext} from "./AuthenticationProvider";

export default function useAuthentication() {
    return useContext(AuthenticationContext)
}

