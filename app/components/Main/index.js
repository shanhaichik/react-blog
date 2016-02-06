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
                        <li styleName="snippet__code">position: Отец Разработчик Наставник;</li>
                        <li styleName="snippet__code">display:&nbsp;
                            <a href="http://vk.com/duhovnyak" target="_blank">VK</a>&nbsp;
                            <a href="https://github.com/shanhaichik" target="_blank">Github</a>;
                        </li>
                        <li styleName="snippet__close">&#125;</li>
                    </ul>
                </div>
            </div>
        )
    }
}