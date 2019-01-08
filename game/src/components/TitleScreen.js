import React, { Component } from 'react';
import './../App.css';

export default class TitleScreen extends Component {
    render() {
        return (
            <div>
                <span className="centerScreen title">Space Invaders</span>
                <span className="centerScreen pressSpace">Press Enter to start the game!</span>
            </div>
        );
    }
}
