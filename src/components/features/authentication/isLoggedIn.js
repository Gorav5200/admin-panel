import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function isUserLoggedIn(Component) {
    return function IsAuth(props) {
        const loggedIn = localStorage.getItem("token") ? true : false
        const navigate = useNavigate();

        // useEffect(() => {
        //     if (!loggedIn) {
        //         navigate("/auth/signin")
        //     }
        //     else {
        //         navigate("/main")
        //     }


        // }, [loggedIn]);


        return <Component {...props} />;
    };
}
