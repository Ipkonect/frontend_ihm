import React from 'react';

import { Route, Redirect } from 'react-router';

import { is_authenticated } from "../services/auth";

const Private_Routes = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            is_authenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);

export default Private_Routes;