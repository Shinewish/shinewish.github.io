var MyGame = MyGame || {};

MyGame.Buttons = function(wld, game, player) {
    this.wld = wld;
    this.game = game;
    this.player = player; 
    
    this.upPressed = false;
    this.rightPressed = false;
    this.downPressed = false;
    this.leftPressed = false;
    this.change = false;

    // create our virtual game controller buttons 
    buttonChange = this.game.add.button(360 - 80, 360 - 80, 'buttonChange', null, this, 0, 1, 0, 1);  //this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    buttonChange.fixedToCamera = true;  //our buttons should stay on the same place  
    buttonChange.events.onInputOver.add(function(){change=true;});
    buttonChange.events.onInputOut.add(function(){change=false;});
    buttonChange.events.onInputDown.add(function(){change=true;});
    buttonChange.events.onInputUp.add(function(){change=false;});

    buttonUp = this.game.add.button(32, 360 - 96, 'buttonvertical', null, this, 0, 1, 0, 1);
    buttonUp.fixedToCamera = true;
    buttonUp.events.onInputOver.add(function(){up=true;});
    buttonUp.events.onInputOut.add(function(){up=false;});
    buttonUp.events.onInputDown.add(function(){up=true;});
    buttonUp.events.onInputUp.add(function(){up=false;});

    buttonUpRight = this.game.add.button(64, 360 - 96, 'buttondiagonal', null, this, 3, 1, 3, 1);
    buttonUpRight.fixedToCamera = true;
    buttonUpRight.events.onInputOver.add(function(){right=true;up=true;});
    buttonUpRight.events.onInputOut.add(function(){right=false;up=false;});
    buttonUpRight.events.onInputDown.add(function(){right=true;up=true;});
    buttonUpRight.events.onInputUp.add(function(){right=false;up=false;});

    buttonRight = this.game.add.button(64, 360 - 64, 'buttonhorizontal', null, this, 0, 1, 0, 1);
    buttonRight.fixedToCamera = true;
    buttonRight.events.onInputOver.add(function(){right=true;});
    buttonRight.events.onInputOut.add(function(){right=false;});
    buttonRight.events.onInputDown.add(function(){right=true;});
    buttonRight.events.onInputUp.add(function(){right=false;});

    buttonBottomRight = this.game.add.button(64, 360 - 32, 'buttondiagonal', null, this, 7, 5, 7, 5);
    buttonBottomRight.fixedToCamera = true;
    buttonBottomRight.events.onInputOver.add(function(){right=true;down=true;});
    buttonBottomRight.events.onInputOut.add(function(){right=false;down=false;});
    buttonBottomRight.events.onInputDown.add(function(){right=true;down=true;});
    buttonBottomRight.events.onInputUp.add(function(){right=false;down=false;});

    buttonDown = this.game.add.button(32, 360 - 32, 'buttonvertical', null, this, 0, 1, 0, 1);
    buttonDown.fixedToCamera = true;
    buttonDown.events.onInputOver.add(function(){down=true;});
    buttonDown.events.onInputOut.add(function(){down=false;});
    buttonDown.events.onInputDown.add(function(){down=true;});
    buttonDown.events.onInputUp.add(function(){down=false;});

    buttonBottomLeft = this.game.add.button(0, 360 - 32, 'buttondiagonal', null, this, 6, 4, 6, 4);
    buttonBottomLeft.fixedToCamera = true;
    buttonBottomLeft.events.onInputOver.add(function(){left=true;down=true;});
    buttonBottomLeft.events.onInputOut.add(function(){left=false;down=false;});
    buttonBottomLeft.events.onInputDown.add(function(){left=true;down=true;});
    buttonBottomLeft.events.onInputUp.add(function(){left=false;down=false;});

    buttonLeft = this.game.add.button(0, 360 - 64, 'buttonhorizontal', null, this, 0, 1, 0, 1);
    buttonLeft.fixedToCamera = true;
    buttonLeft.events.onInputOver.add(function(){left=true;});
    buttonLeft.events.onInputOut.add(function(){left=false;});
    buttonLeft.events.onInputDown.add(function(){left=true;});
    buttonLeft.events.onInputUp.add(function(){left=false;});

    buttonUpLeft = this.game.add.button(0, 360 - 96, 'buttondiagonal', null, this, 2, 0, 2, 0);
    buttonUpLeft.fixedToCamera = true;
    buttonUpLeft.events.onInputOver.add(function(){left=true;up=true;});
    buttonUpLeft.events.onInputOut.add(function(){left=false;up=false;});
    buttonUpLeft.events.onInputDown.add(function(){left=true;up=true;});
    buttonUpLeft.events.onInputUp.add(function(){left=false;up=false;});
    
};

MyGame.Buttons.prototype = Object.create(Phaser.Sprite.prototype);
MyGame.Buttons.prototype.constructor = MyGame.Player;

MyGame.Buttons.prototype.update = function() {
    // define what should happen when a button is pressed
    if (this.upPressed) {
        this.wld.player.body.velocity.y = -1 * this.wld.player.speed;
        this.player.play('go');
    }
    else if (this.downPressed) {
        this.wld.player.body.velocity.y = this.wld.player.speed;
        this.player.play('go');
    }
    else {
      this.wld.player.body.velocity.y = 0;
    }
    if (this.leftPressed) {
        this.wld.player.body.velocity.x = -1 * this.wld.player.speed;
        this.scale.setTo(-1, 1);
        this.player.play('go');
    }
    else if (this.rightPressed) {
        this.wld.player.body.velocity.x = this.wld.player.speed;
        this.scale.setTo(1, 1);
        this.player.play('go');
    } else {
        this.wld.player.body.velocity.x = 0;
    }
    if (this.change) {
        this.wld.player.update.changeTexture();
    }  //change to another frame of the spritesheet
    // if (fire){fire_now(); player.loadTexture('mario', 8); }
    if (this.game.input.currentPointers == 0 && !this.game.input.activePointer.isMouse) {
        this.change = false; 
        this.rightPressed = false; 
        this.leftPressed = false; 
        this.downPressed = false; 
        this.upPressed = false;
    } //this works around a "bug" where a button gets stuck in pressed state
};