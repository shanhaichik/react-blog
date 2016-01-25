import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NotFound extends Component {
    render() {
        return (
            <article>
                <h1>Страница не найдена.</h1>
                <Link to="/" className="btn">Главная</Link>
            </article>
        );
    }
}