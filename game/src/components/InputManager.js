import  {Component} from 'react';

const KEY = {
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    ENTER: 13
};

export default class InputManager extends Component {

    constructor(props) {
        super(props);
        //Define names for keyevents
        this.pressedKeys = {left: 0, right: 0, space: 0, enter: 0};
    }


    bindKeys() {
        //Released key
        window.addEventListener('keyup', this.handleKeys.bind(this, false));
        //Pressed key
        window.addEventListener('keydown', this.handleKeys.bind(this, true));
    }

    unbindKeys() {
        window.removeEventListener('keyup', this.handleKeys);
        window.removeEventListener('keydown', this.handleKeys);
    }

    handleKeys(value, e) {
        let keys = this.pressedKeys;
        switch (e.keyCode) {
            case KEY.LEFT:
                keys.left = value;
                break;
            case KEY.RIGHT:
                keys.right = value;
                break;
            case KEY.SPACE:
                keys.space = value;
                break;
            case KEY.ENTER:
                keys.enter = value;
                break;
        }
        this.pressedKeys = keys;
    }

}
