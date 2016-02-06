import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './snippet.css';

@CSSModules(styles)
export default class Main extends Component {
    render() {
        return (
            <div>
                <div styleName='snippet'>
                    <ul>
                        <li styleName="snippet__class">.Alexander .Dukhovnyak <span>&#123;</span></li>
                        <li styleName="snippet__code">content: 'Человек не стар, пока он чему-то учится!'</li>
                        <li styleName="snippet__code">size: '28лет'</li>
                        <li styleName="snippet__close">&#125;</li>
                    </ul>
                </div>
            </div>
        )
    }
}