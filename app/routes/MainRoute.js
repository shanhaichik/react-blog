import React, { PropTypes, Component } from 'react';

import Main from 'Main';
import VideoBackground from 'Common/VideoBackground';

export default class MainRoute extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    render() {
        return (
             <div>
                <VideoBackground video="main" />
                <Main />
             </div>
        )
    }
}