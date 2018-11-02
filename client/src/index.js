import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "./components/App";
import Welcome from "./components/Welcome";
import Signup from "./components/auth/Signup";

ReactDOM.render(
    <Router>
        <App>
            <Route path="/" exact component={Welcome} />
            <Route path="/signup" component={Signup} />
        </App>
    </Router>,
    document.getElementById("root")
);
