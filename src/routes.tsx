
import {MainPage} from "./Pages/MainPage/MainPage";
import React from "react";
import {BrowserRouter as Router,Redirect, Route, Switch} from "react-router-dom";


export const useRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <MainPage/>
                </Route>
                <Redirect to='/'/>
            </Switch>
        </Router>
    )
}
