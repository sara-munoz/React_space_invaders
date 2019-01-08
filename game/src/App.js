import React, {Component} from 'react';
import './App.css';
import TitleScreen from "./components/TitleScreen";
import InputManager from "./components/InputManager";
import Ship from "./gameComponents/Ship";
import Invader from './gameComponents/Invader';

const GameState = {
    StartScreen: 0,
    Playing: 1,
    GameOver: 2
};


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: new InputManager(),
            screen: {
                width: 800,
                height: window.innerHeight,
                ratio: window.devicePixelRatio || 1
            },
            gameState: GameState.StartScreen,
            context: null
        };
        this.ship = null;
        //Array of enemies
        this.invaders = [];
    }


    componentDidMount() {
        this.state.input.bindKeys();

        //Canvas passed as context at the state
        const context = this.refs.canvas.getContext('2d');
        this.setState({ context: context });

        //Game loop, it will run as the app itself is running
        requestAnimationFrame(() => {
            this.update()
        });
    }

    componentWillUnmount() {
        this.state.input.unbindKeys();
    }


    update() {
        const keys = this.state.input.pressedKeys;

        //Initial screen
        if (this.state.gameState === GameState.StartScreen && keys.enter) {
            this.startGame();
        }

        //Playing
        if (this.state.gameState === GameState.Playing) {
            this.clearBackground();
            if (this.ship !== undefined && this.ship !== null) {
                this.ship.update(keys);
                this.ship.render(this.state);
            }
            this.renderInvaders(this.state);
        }

        //Game loop, it will run as the app itself is running
        requestAnimationFrame(() => {
            this.update()
        });
    }

    //The game state is changed to Playing
    startGame() {

        this.ship = new Ship({
            radius: 15,
            speed: 2.5,
            position: {
                x: this.state.screen.width/2,
                y: this.state.screen.height - 50
            }});

        this.createInvaders(27);

        this.setState({
            gameState: GameState.Playing
        });
    }

    clearBackground() {
        const context = this.state.context;
        context.save();
        context.scale(this.state.screen.ratio, this.state.screen.ratio);
        context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
        context.globalAlpha = 1;
    }


    render() {
        return (
            <div>

                {this.state.gameState === GameState.StartScreen && <TitleScreen/>}


                <canvas ref="canvas"
                        width={this.state.screen.width * this.state.screen.ratio}
                        height={this.state.screen.height * this.state.screen.ratio}/>

            </div>
        );
    }


    // Invader's methods

    createInvaders(count) {
        const newPosition = { x: 100, y: 20 };
        let swapStartX = true;

        for (var i = 0; i < count; i++) {
            const invader = new Invader({
                position: { x: newPosition.x, y: newPosition.y },
                speed: 1,
                radius: 50
            });

            newPosition.x += invader.radius + 20;

            if (newPosition.x + invader.radius + 50 >= this.state.screen.width) {
                newPosition.x = swapStartX ? 110 : 100;
                swapStartX = !swapStartX;
                newPosition.y += invader.radius + 20;
            }

            this.invaders.push(invader);
        }
    }

    renderInvaders(state) {
        let index = 0;
        let reverse = false;

        for (let invader of this.invaders) {
            if (invader.position.x + invader.radius >= this.state.screen.width ||
                invader.position.x - invader.radius <= 0) {
                reverse = true;
            }
            else {
                this.invaders[index].update();
                this.invaders[index].render(state);
            }
            index++;
        }

        if (reverse) {
            this.reverseInvaders();
        }
    }

    reverseInvaders() {
        let index = 0;
        for (let invader of this.invaders) {
            this.invaders[index].reverse();
            index++;
        }
    }

}

export default App;
