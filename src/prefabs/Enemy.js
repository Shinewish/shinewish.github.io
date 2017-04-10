import Phaser from 'phaser'

export default class extends Phaser.Sprite {

    constructor (game, player, x, y, sprite, path) {
        super(game, x, y, sprite/*, idle frame*/);
        this.anchor.setTo(0.5);

        this.game = game;
        this.game.physics.arcade.enable(this);
        this.player = player;

        if (sprite == 'guard') {
            this.speed = 40;
            this.visRad = 40;
            this.visRadAlert = 60;
            this.lookRange = this.game.math.PI2 / 8;
            this.lookImage = 'enemyVision2';
            this.anch = 0;
        }
        if (sprite == 'bat') {
            this.speed = 40;
            this.visRad = 25;
            this.visRadAlert = 35;
            this.lookRange = this.game.math.PI2 / 2;
            this.lookImage = 'enemyVision3';
            this.anch = 0.5;
        }   
        if (sprite == 'gorgul') {
            this.speed = 0;
            this.visRad = 40;
            this.visRadAlert = 60;
            this.lookRange = this.game.math.PI2 / 8;
            this.lookImage = 'enemyVision2';
            this.anch = 0;
        }

        // [2,3] - animation frames
        // 4 - FPS
        // true - loop the animation
        this.animations.add('go', [0, 1], 4, true);
        // [[x1,y1],[x2,y2],...];
        this.path = JSON.parse(path);

        //normal next point if player isn't seen

        this.nextPoint = 1;
        this.xNext = this.path[this.nextPoint][0];
        this.yNext = this.path[this.nextPoint][1];

        //XY of seen player
        this.xTarg = undefined;
        this.yTarg = undefined;

        this.xDest = this.xNext;
        this.yDest = this.yNext;

        this.getDirect = () => {
            return this.game.math.angleBetween(this.x, this.y, this.xDest, this.yDest); 
        }

        // vision
        this.vision = this.game.add.sprite(x, y, this.lookImage, 0);

        this.vision.alpha = 0.5;
        this.vision.anchor.setTo(this.anch);
        this.vision.rotation = this.getDirect() - this.lookRange;
    }

    update () {
        //draw vision arc
        this.vision.x = this.x;
        this.vision.y = this.y;
        this.vision.rotation = this.getDirect() - this.lookRange;

        this.setDest = () => {
            this.xDest = this.xTarg ? this.xTarg : this.xNext;
            this.yDest = this.yTarg ? this.yTarg : this.yNext;
        }
        this.setDest();

        this.xDistance = Math.round(this.xDest - this.x);
        this.yDistance = Math.round(this.yDest - this.y);
        this.dist = this.game.math.distance(this.x, this.y, this.xDest, this.yDest);

        if ((this.xDistance === 0) && (this.yDistance === 0)) {
            //this.nextPoint = (this.nextPoint === (this.path.length - 1)) ? 0 : this.nextPoint++;
            if (this.nextPoint === (this.path.length - 1)) {
                this.nextPoint = 0;
            } else {
                this.nextPoint = this.nextPoint + 1;
            }
            this.xNext = this.path[this.nextPoint][0];
            this.yNext = this.path[this.nextPoint][1];
            this.setDest();
        } else {
    //??add minimal velocity ?       
            this.body.velocity.x = this.game.math.max(this.speed * this.xDistance / this.dist);
            if (this.body.velocity.x > 0) {
                this.scale.setTo(1, 1);
            } else {
                this.scale.setTo(-1, 1);
            }
            this.play('go');
            this.body.velocity.y = this.game.math.max(this.speed * this.yDistance / this.dist);
        }
    }  
}
