import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './VideoBackground.css';

@CSSModules(styles)
export default class VideoBackground extends Component {

    static propTypes = {
        video: PropTypes.string.isRequired
    };

    state = {
      play: false
    };

    canPlay(e) {
        this.setState({
            play: true
        });
    }

    render() {
        const source = ['mp4','webm','ogg'].map(type => (<source
            src={require(`../../../assets/video/${this.props.video}.${type}`)}
            type={`video/${type}`}
            style={{'display': this.state.play ? 'block': 'none'}}
            key={type} />)
        );

        return (
            <div styleName="background">
                <video autoPlay loop styleName="player" onLoadedData={this.canPlay.bind(this)}>
                    {
                        source
                    }
                </video>
            </div>
        )
    }
}