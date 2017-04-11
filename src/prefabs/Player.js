import Phaser from 'phaser'

export default class extends Phaser.Sprite {


    constructor (wld, game, x, y, type, room) {
        super(game, x, y, type/*, idle frame*/);
        this.anchor.setTo(0.5);
        this.animations.add('go', [1, 0], 4, false);

        // [2,3] - animation frames
        // 4 - FPS
        // true - loop the animation
        //this.animations.add('goTop', [2, 3], 4, true);    this.animations.add('go', [1, 0], 4, false);

        this.wld = wld;
        this.game = game;
        this.game.physics.arcade.enable(this);
        this.isHiding = 0;
        this.room = parseInt(room);

        this.speed = 82;
        this.visibility = 1;
        this.isSeen = 0;

        this.direction = 90; //(0, 90, 180, 270)
        this.appearance = 'girl';//bat;

        this.hasKey = 0;

        //  Player physics properties. Give the little guy a slight bounce.
        this.body.collideWorldBounds = true;
        this.body.setSize(10, 10, 3, 3);
        
        this.textStyle = {font: '14px Arial', fill: '#fcff00', stroke: '#412017', strokeThickness: 3, align: 'center'};

        this.message1 = this.game.add.text(this.x, this.y - 45, '', this.textStyle);
        this.message1.anchor.setTo(0.5,0);
        this.message2 = this.game.add.text(this.x, this.y - 30, '', this.textStyle);
        this.message2.anchor.setTo(0.5,0);
    }

    update () {
        if (this.isHiding) {
            this.alpha = 0.6;
            this.visibility = 0;
        } else if (this.wld.game.player.texture.baseTexture.source.name == 'cat') {
            this.alpha = 1;
            this.visibility = 0;
        } else {
            this.alpha = 1;
            this.visibility = 1;
        }

        //player movement
        if (this.game.device.desktop) {
            if (this.wld.cursors.up.isDown || this.wld.altCursors.up.isDown) {
                this.wld.game.player.body.velocity.y = -1 * this.wld.game.player.speed;
                this.play('go');
            }
            else if (this.wld.cursors.down.isDown || this.wld.altCursors.down.isDown) {
                this.wld.game.player.body.velocity.y = this.wld.game.player.speed;
                this.play('go');
            }
            else {
              this.wld.game.player.body.velocity.y = 0;
            }
            if (this.wld.cursors.left.isDown || this.wld.altCursors.left.isDown) {
                this.wld.game.player.body.velocity.x = -1 * this.wld.game.player.speed;
                this.scale.setTo(-1, 1);
                this.play('go');
            }
            else if (this.wld.cursors.right.isDown || this.wld.altCursors.right.isDown) {
                this.wld.game.player.body.velocity.x = this.wld.game.player.speed;
                this.scale.setTo(1, 1);
                this.play('go');
            } else {
                this.wld.game.player.body.velocity.x = 0;
            }
        } else {
            if (this.wld.upPressed) {
                this.game.player.body.velocity.y = -1 * this.game.player.speed;
                this.game.player.play('go');
            }
            else if (this.wld.downPressed) {
                this.game.player.body.velocity.y = this.game.player.speed;
                this.game.player.play('go');
            }
            else {
              this.game.player.body.velocity.y = 0;
            }
            if (this.wld.leftPressed) {
                this.game.player.body.velocity.x = -1 * this.game.player.speed;
                this.game.player.scale.setTo(-1, 1);
                this.game.player.play('go');
            }
            else if (this.wld.rightPressed) {
                this.game.player.body.velocity.x = this.game.player.speed;
                this.game.player.scale.setTo(1, 1);
                this.game.player.play('go');
            } else {
                this.game.player.body.velocity.x = 0;
            }

            if ((!this.game.device.desktop) && (this.game.input.totalActivePointers == 0 || this.game.input.activePointer.isMouse)) {
                this.wld.usePressed = false;
                this.wld.changePressed = false; 
                this.wld.rightPressed = false; 
                this.wld.leftPressed = false; 
                this.wld.downPressed = false; 
                this.wld.upPressed = false;
            } //this works around a "bug" where a button gets stuck in pressed state
        }
    }  
}
