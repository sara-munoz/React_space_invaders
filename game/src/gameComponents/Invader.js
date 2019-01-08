export const Direction = {
    Left:  0,
    Right: 1,
};

export default class Invader {
    constructor (args) {
        this.direction = Direction.Right;
        this.position = args.position;
        this.speed = args.speed;
        this.radius = args.radius;
        this.onDie = args.onDie;
    }

    reverse() {
        if (this.direction === Direction.Right) {
            this.position.x -= 10;
            this.direction = Direction.Left;
        } else {
            this.direction = Direction.Right;
            this.position.x += 10;
        }
    }

    update() {
        if (this.direction === Direction.Right) {
            this.position.x += this.speed;
        } else {
            this.position.x -= this.speed;
        }
    }

    render(state) {
        const context = state.context;
        context.save();
        context.translate(this.position.x, this.position.y);
        context.strokeStyle = '#47CDFF';
        context.fillStyle = '#47CDFF';
        context.lineWidth = 2;
        context.fillRect(0,0,30,20);
        context.restore();
    }
}
