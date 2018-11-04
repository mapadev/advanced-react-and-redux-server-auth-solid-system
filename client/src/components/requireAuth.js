import React, { Component } from "react";
import { connect } from "react-redux";

const requireAuth = ChildComponent => {
    class ComposedComponent extends Component {
        // When component just got rendered
        componentDidMount() {
            this.shouldNavigageAway();
        }

        // When component just got updated
        componentDidUpdate(prevProps, prevState) {
            this.shouldNavigageAway();
        }

        shouldNavigageAway() {
            if (!this.props.auth) {
                this.props.history.push("/");
            }
        }

        render() {
            return <ChildComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return {
            auth: state.auth.authenticated
        };
    }

    return connect(mapStateToProps)(ComposedComponent);
};

export default requireAuth;
