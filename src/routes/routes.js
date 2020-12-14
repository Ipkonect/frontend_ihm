import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LOGIN_PAGE from '../pages/login';
import ENGINE_1_PAGE from '../pages/engine_1';
import ENGINE_2_PAGE from '../pages/engine_2';
import ENGINE_3_PAGE from '../pages/engine_3';
import PANEL_PAGE from '../pages/panel';

import PRIVATE_ROUTE from './private_routes';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={LOGIN_PAGE} exact path="/" />
                <PRIVATE_ROUTE component={ENGINE_1_PAGE} path="/engine_1" />
                <PRIVATE_ROUTE component={ENGINE_2_PAGE} path="/engine_2" />
                <PRIVATE_ROUTE component={ENGINE_3_PAGE} path="/engine_3" />
                <PRIVATE_ROUTE component={PANEL_PAGE} path="/panel" />
            </Switch>
        </BrowserRouter >
    )
}

export default Routes;