import React, { PropTypes } from 'react';
import { connect } from 'react-redux';


export default class App extends React.Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        dispatch: PropTypes.func.isRequired,
        error:    PropTypes.string
    };

    static contextTypes = {
        router: PropTypes.object
    };

    render() {

        return (
            <div className="wrapper">
                { this.props.children }
            </div>
        );
    }
}