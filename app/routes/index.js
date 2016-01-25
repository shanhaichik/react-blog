import React from 'react';
import { Route } from 'react-router';
import redirectBackAfter from '../utils/redirectBackAfter';
import fillStore from '../utils/fillStore';

// Import routes
import App          from '../components/App';
import NotFoundPage from '../components/NotFound/NotFoundPage';

const routes = (
    <Route component={App}>
        <Route requireAuth>
            <Route path="/home" component={HomePage} />
        </Route>

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
            const loggedIn = !!store.getState().auth.token;

            if (route.requireAuth && !loggedIn) {
                transition.to(...redirectBackAfter('/login', nextState));
            } else if (client) {
                fillStore(store, nextState, [route.component]);
            }
        };
    });
};