import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./components/App";
import Welcome from "./components/Welcome";
import Signup from "./components/auth/Signup";
import reducers from "./reducers";

ReactDOM.render(
    <Provider store={createStore(reducers, {})}>
        <Router>
            <App>
                <Route path="/" exact component={Welcome} />
                <Route path="/signup" component={Signup} />
            </App>
        </Router>
    </Provider>,
    document.getElementById("root")
);
