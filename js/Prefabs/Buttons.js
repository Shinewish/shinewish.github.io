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
    buttonUp.events.onInputOver.add(function(){upPressed=true;});
    buttonUp.events.onInputOut.add(function(){upPressed=false;});
    buttonUp.events.onInputDown.add(function(){upPressed=true;});
    buttonUp.events.onInputUp.add(function(){upPressed=false;});

    buttonUpRight = this.game.add.button(64, 360 - 96, 'buttondiagonal', null, this, 3, 1, 3, 1);
    buttonUpRight.fixedToCamera = true;
    buttonUpRight.events.onInputOver.add(function(){rightPressed=true;upPressed=true;});
    buttonUpRight.events.onInputOut.add(function(){rightPressed=false;upPressed=false;});
    buttonUpRight.events.onInputDown.add(function(){rightPressed=true;upPressed=true;});
    buttonUpRight.events.onInputUp.add(function(){rightPressed=false;upPressed=false;});

    buttonRight = this.game.add.button(64, 360 - 64, 'buttonhorizontal', null, this, 0, 1, 0, 1);
    buttonRight.fixedToCamera = true;
    buttonRight.events.onInputOver.add(function(){rightPressed=true;});
    buttonRight.events.onInputOut.add(function(){rightPressed=false;});
    buttonRight.events.onInputDown.add(function(){rightPressed=true;});
    buttonRight.events.onInputUp.add(function(){rightPressed=false;});

    buttonBottomRight = this.game.add.button(64, 360 - 32, 'buttondiagonal', null, this, 7, 5, 7, 5);
    buttonBottomRight.fixedToCamera = true;
    buttonBottomRight.events.onInputOver.add(function(){rightPressed=true;downPressed=true;});
    buttonBottomRight.events.onInputOut.add(function(){rightPressed=false;downPressed=false;});
    buttonBottomRight.events.onInputDown.add(function(){rightPressed=true;downPressed=true;});
    buttonBottomRight.events.onInputUp.add(function(){rightPressed=false;downPressed=false;});

    buttonDown = this.game.add.button(32, 360 - 32, 'buttonvertical', null, this, 0, 1, 0, 1);
    buttonDown.fixedToCamera = true;
    buttonDown.events.onInputOver.add(function(){downPressed=true;});
    buttonDown.events.onInputOut.add(function(){downPressed=false;});
    buttonDown.events.onInputDown.add(function(){downPressed=true;});
    buttonDown.events.onInputUp.add(function(){downPressed=false;});

    buttonBottomLeft = this.game.add.button(0, 360 - 32, 'buttondiagonal', null, this, 6, 4, 6, 4);
    buttonBottomLeft.fixedToCamera = true;
    buttonBottomLeft.events.onInputOver.add(function(){leftPressed=true;downPressed=true;});
    buttonBottomLeft.events.onInputOut.add(function(){leftPressed=false;downPressed=false;});
    buttonBottomLeft.events.onInputDown.add(function(){leftPressed=true;downPressed=true;});
    buttonBottomLeft.events.onInputUp.add(function(){leftPressed=false;downPressed=false;});

    buttonLeft = this.game.add.button(0, 360 - 64, 'buttonhorizontal', null, this, 0, 1, 0, 1);
    buttonLeft.fixedToCamera = true;
    buttonLeft.events.onInputOver.add(function(){leftPressed=true;});
    buttonLeft.events.onInputOut.add(function(){leftPressed=false;});
    buttonLeft.events.onInputDown.add(function(){leftPressed=true;});
    buttonLeft.events.onInputUp.add(function(){leftPressed=false;});

    buttonUpLeft = this.game.add.button(0, 360 - 96, 'buttondiagonal', null, this, 2, 0, 2, 0);
    buttonUpLeft.fixedToCamera = true;
    buttonUpLeft.events.onInputOver.add(function(){leftPressed=true;upPressed=true;});
    buttonUpLeft.events.onInputOut.add(function(){leftPressed=false;upPressed=false;});
    buttonUpLeft.events.onInputDown.add(function(){leftPressed=true;upPressed=true;});
    buttonUpLeft.events.onInputUp.add(function(){leftPressed=false;upPressed=false;});
    

    this.update = function() {
    // if (typeof(upPressed) == 'undefined') {var upPressed = false};
    // if (typeof(rightPressed) == 'undefined') {var rightPressed = false};
    // if (typeof(downPressed) == 'undefined') {var downPressed = false};
    // if (typeof(leftPressed) == 'undefined') {var leftPressed = false};
    // if (typeof(change) == 'undefined') {var change = false};
    // define what should happen when a button is pressed
    if (upPressed) {
        this.wld.player.body.velocity.y = -1 * this.wld.player.speed;
        this.player.play('go');
    }
    else if (downPressed) {
        this.wld.player.body.velocity.y = this.wld.player.speed;
        this.player.play('go');
    }
    else {
      this.wld.player.body.velocity.y = 0;
    }
    if (leftPressed) {
        this.wld.player.body.velocity.x = -1 * this.wld.player.speed;
        this.scale.setTo(-1, 1);
        this.player.play('go');
    }
    else if (rightPressed) {
        this.wld.player.body.velocity.x = this.wld.player.speed;
        this.scale.setTo(1, 1);
        this.player.play('go');
    } else {
        this.wld.player.body.velocity.x = 0;
    }
    if (change) {
        this.wld.player.update.changeTexture();
    }  //change to another frame of the spritesheet
    // if (fire){fire_now(); player.loadTexture('mario', 8); }
    if (this.game.input.currentPointers == 0 && !this.game.input.activePointer.isMouse) {
        change = false; 
        rightPressed = false; 
        leftPressed = false; 
        downPressed = false; 
        upPressed = false;
    } //this works around a "bug" where a button gets stuck in pressed state
};

MyGame.Buttons.prototype = Object.create(Phaser.Sprite.prototype);
MyGame.Buttons.prototype.constructor = MyGame.Player;

MyGame.Buttons.update = function() {
    if (typeof(upPressed) == 'undefined') {var upPressed = false};
    if (typeof(rightPressed) == 'undefined') {var rightPressed = false};
    if (typeof(downPressed) == 'undefined') {var downPressed = false};
    if (typeof(leftPressed) == 'undefined') {var leftPressed = false};
    if (typeof(change) == 'undefined') {var change = false};
    // define what should happen when a button is pressed
    if (upPressed) {
        this.wld.player.body.velocity.y = -1 * this.wld.player.speed;
        this.player.play('go');
    }
    else if (downPressed) {
        this.wld.player.body.velocity.y = this.wld.player.speed;
        this.player.play('go');
    }
    else {
      this.wld.player.body.velocity.y = 0;
    }
    if (leftPressed) {
        this.wld.player.body.velocity.x = -1 * this.wld.player.speed;
        this.scale.setTo(-1, 1);
        this.player.play('go');
    }
    else if (rightPressed) {
        this.wld.player.body.velocity.x = this.wld.player.speed;
        this.scale.setTo(1, 1);
        this.player.play('go');
    } else {
        this.wld.player.body.velocity.x = 0;
    }
    if (change) {
        this.wld.player.update.changeTexture();
    }  //change to another frame of the spritesheet
    // if (fire){fire_now(); player.loadTexture('mario', 8); }
    if (this.game.input.currentPointers == 0 && !this.game.input.activePointer.isMouse) {
        change = false; 
        rightPressed = false; 
        leftPressed = false; 
        downPressed = false; 
        upPressed = false;
    } //this works around a "bug" where a button gets stuck in pressed state
};