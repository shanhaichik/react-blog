import React from 'react';
import { Route } from 'react-router';
import redirectBackAfter from '../utils/redirectBackAfter';
import fillStore from '../utils/fillStore';

// Import routes
import Wrapper from 'Wrapper';
import NotFoundPage from 'NotFound/NotFoundPage';

import MainPage from './MainRoute';

const routes = (
    <Route component={Wrapper}>
        <Route path="/" component={MainPage} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);

function walk(routes, cb) {
    cb(routes);

    if (routes.childRoutes) {
        routes.childRoutes.forEach(route => walk(route, cb));
    }

    return routes;
}


export default (store, client) => {
    return walk(Route.createRouteFromReactElement(routes), route => {
        route.onEnter = (nextState, transition) => {
            if (client) {
                fillStore(store, nextState, [route.component]);
            }
        };
    });
};
