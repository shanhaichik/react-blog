
/*
 * Main CSS
 * */
import style from './style/app.css';

import React from 'react';
import ReactDOM from 'react-dom';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import FontFaceObserver  from 'fontfaceobserver';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const RobotoObserver = new FontFaceObserver('Roboto', {});

RobotoObserver.check().then(() => {
    document.body.classList.add(style['js-roboto-loaded']);
}, () => {
    document.body.classList.remove(style['js-roboto-loaded']);
});

import Root from 'Root';


/*
* Enable Browser History
* */
const history = new BrowserHistory();


ReactDOM.render(
    <Root history={history} />,
    document.getElementById('root')
);