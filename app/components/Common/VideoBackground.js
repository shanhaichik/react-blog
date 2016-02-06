import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './VideoBackground.css';

@CSSModules(styles)
export default class VideoBackground extends Component {

    static propTypes = {
        video: PropTypes.string.isRequired
    };

    render() {
        const source = ['mp4','webm','ogg'].map(type => (<source src={require(`../../../assets/video/${this.props.video}.${type}`)} type={`video/${type}`} key={type} />));
        return (
            <div styleName="background">
                <video autoPlay loop styleName="player">
                    {
                        source
                    }
                </video>
            </div>
        )
    }
}