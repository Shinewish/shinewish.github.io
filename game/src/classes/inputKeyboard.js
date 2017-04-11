import Phaser from 'phaser'

export const createControls = () => {
    //create controls keys
    if (!this.game.device.desktop) {
        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.altCursors = this.game.input.keyboard.addKeys( { 'up': Phaser.Keyboard.W, 'down': Phaser.Keyboard.S, 'left': Phaser.Keyboard.A, 'right': Phaser.Keyboard.D } );
        
        //additional keys
        this.keyChange = this.game.input.keyboard.addKeys({'change': Phaser.Keyboard.C});
        this.keyUse = this.game.input.keyboard.addKeys({'use': Phaser.Keyboard.E});
        this.keyFullscreen = this.game.input.keyboard.addKeys({'fullscreen': Phaser.Keyboard.F11});

        //use key
        this.keyUse.use.onDown.add(this.useIt, this);
    }
    //else create touch controls 
    else { 
     //  this.game.input.onDown.add(this.scale.startFullScreen(), this); 
     // this.buttons = new MyGame.Buttons(this, this.game, this.player);
      //this.buttons.update =  this.buttons.prototype.update;
    //}    
        // create our virtual game controller buttons 
        this.w = this.game.width;
        this.h = this.game.height;

        buttonUse = this.game.add.button(this.w - 80, this.h - 80, 'buttonUse', null, this, 1, 0, 1, 0);  //this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
        buttonUse.fixedToCamera = true;  //our buttons should stay on the same place  
        buttonUse.events.onInputOver.add(this.useIt, this);
        buttonUse.events.onInputOut.add(function(){usePressed=false;});
        buttonUse.events.onInputDown.add(this.useIt, this);
        buttonUse.events.onInputUp.add(function(){usePressed=false;});
        
        buttonChange = this.game.add.button(this.w - 40, 20, 'buttonChange', null, this, 0, 1, 0, 1);  //this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
        buttonChange.alpha = 0;
        buttonChange.fixedToCamera = true;  //our buttons should stay on the same place  
        buttonChange.events.onInputOver.add(this.changeTexture, this);
        buttonChange.events.onInputOut.add(function(){changePressed=false;});
        buttonChange.events.onInputDown.add(this.changeTexture, this);
        buttonChange.events.onInputUp.add(function(){changePressed=false;});

        buttonUpLeft = this.game.add.button(0, this.h - 96, 'button', null, this, 3, 0, 3, 0);
        buttonUpLeft.fixedToCamera = true;
        buttonUpLeft.events.onInputOver.add(function(){leftPressed=true;upPressed=true;});
        buttonUpLeft.events.onInputOut.add(function(){leftPressed=false;upPressed=false;});
        buttonUpLeft.events.onInputDown.add(function(){leftPressed=true;upPressed=true;});
        buttonUpLeft.events.onInputUp.add(function(){leftPressed=false;upPressed=false;});

        buttonUp = this.game.add.button(32, this.h - 96, 'button', null, this, 4, 1, 4, 1);
        buttonUp.fixedToCamera = true;
        buttonUp.events.onInputOver.add(function(){upPressed=true;});
        buttonUp.events.onInputOut.add(function(){upPressed=false;});
        buttonUp.events.onInputDown.add(function(){upPressed=true;});
        buttonUp.events.onInputUp.add(function(){upPressed=false;});

        buttonUpRight = this.game.add.button(64, this.h - 96, 'button', null, this, 5, 2, 5, 2);
        buttonUpRight.fixedToCamera = true;
        buttonUpRight.events.onInputOver.add(function(){rightPressed=true;upPressed=true;});
        buttonUpRight.events.onInputOut.add(function(){rightPressed=false;upPressed=false;});
        buttonUpRight.events.onInputDown.add(function(){rightPressed=true;upPressed=true;});
        buttonUpRight.events.onInputUp.add(function(){rightPressed=false;upPressed=false;});

        buttonLeft = this.game.add.button(0, this.h - 64, 'button', null, this, 9, 6, 9, 6);
        buttonLeft.fixedToCamera = true;
        buttonLeft.events.onInputOver.add(function(){leftPressed=true;});
        buttonLeft.events.onInputOut.add(function(){leftPressed=false;});
        buttonLeft.events.onInputDown.add(function(){leftPressed=true;});
        buttonLeft.events.onInputUp.add(function(){leftPressed=false;});

        buttonRight = this.game.add.button(64, this.h - 64, 'button', null, this, 11, 8, 11, 8);
        buttonRight.fixedToCamera = true;
        buttonRight.events.onInputOver.add(function(){rightPressed=true;});
        buttonRight.events.onInputOut.add(function(){rightPressed=false;});
        buttonRight.events.onInputDown.add(function(){rightPressed=true;});
        buttonRight.events.onInputUp.add(function(){rightPressed=false;});

        buttonBottomLeft = this.game.add.button(0, this.h - 32, 'button', null, this, 15, 12, 15, 12);
        buttonBottomLeft.fixedToCamera = true;
        buttonBottomLeft.events.onInputOver.add(function(){leftPressed=true;downPressed=true;});
        buttonBottomLeft.events.onInputOut.add(function(){leftPressed=false;downPressed=false;});
        buttonBottomLeft.events.onInputDown.add(function(){leftPressed=true;downPressed=true;});
        buttonBottomLeft.events.onInputUp.add(function(){leftPressed=false;downPressed=false;});
        
        buttonDown = this.game.add.button(32, this.h - 32, 'button', null, this, 16, 13, 16, 13);
        buttonDown.fixedToCamera = true;
        buttonDown.events.onInputOver.add(function(){downPressed=true;});
        buttonDown.events.onInputOut.add(function(){downPressed=false;});
        buttonDown.events.onInputDown.add(function(){downPressed=true;});
        buttonDown.events.onInputUp.add(function(){downPressed=false;});

        buttonBottomRight = this.game.add.button(64, this.h - 32, 'button', null, this, 17, 14, 17, 14);
        buttonBottomRight.fixedToCamera = true;
        buttonBottomRight.events.onInputOver.add(function(){rightPressed=true;downPressed=true;});
        buttonBottomRight.events.onInputOut.add(function(){rightPressed=false;downPressed=false;});
        buttonBottomRight.events.onInputDown.add(function(){rightPressed=true;downPressed=true;});
        buttonBottomRight.events.onInputUp.add(function(){rightPressed=false;downPressed=false;});
    }
}

