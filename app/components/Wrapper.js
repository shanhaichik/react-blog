import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {wrapper} from '../style/app.css';


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
            <div className={wrapper}>
                { this.props.children }
            </div>
        );
    }
}