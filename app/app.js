import React from 'react';
import ReactDOM from 'react-dom';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import FontFaceObserver  from 'fontfaceobserver';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Root from 'Root';

/*
 * Main CSS
 * */
import './style/app.css';

/*
* Enable Browser History
* */
const history = new BrowserHistory();


ReactDOM.render(
    <Root {...history} />,
    document.getElementById('root')
);