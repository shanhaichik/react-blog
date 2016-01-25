import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

@connect(state => ({
    auth: state.auth
}))
export default class App extends React.Component {
    static propTypes = {
        auth:     PropTypes.object.isRequired,
        children: PropTypes.element.isRequired,
        dispatch: PropTypes.func.isRequired,
        error:    PropTypes.string
    };

    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        // Временная проверка на авторизацию
        const {auth, dispatch} = this.props;

        return (
            <div className="wrapper">

                { this.props.children }
            </div>
        );
    }
}