import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';

import style from './wrapper.css';
import normalize from 'normalize.css/normalize.css';

CSSModules({...normalize, ...style})
export default class Wrapper extends React.Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        error:    PropTypes.string
    };

    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        return (
            <div styleName="wrapper">
                { this.props.children }
            </div>
        );
    }
}