import React,{ Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createRedux } from '../utils/redux';

import { routerStateChange } from 'actions/router';
import routes from 'routes';

/*
* Create store
* */
const store = createRedux({});

export default class Root extends Component {

    static propTypes = {
        history: PropTypes.object.isRequired
    };

    render() {
        return (
            <Provider store={store}>
                <Router
                    history={this.props.history}
                    routes={routes(store, true)}

                    onUpdate={function () {
                       store.dispatch(routerStateChange(this.state));
                    }}
                />
            </Provider>
        );
    };
}
