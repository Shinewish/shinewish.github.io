import Phaser from 'phaser'
import { useIt, changeTexture } from '../funs/funs'

export const createControls = (wrld) => {
    //create controls keys
    if (wrld.game.device.desktop) {
        //move player with cursor keys
        wrld.cursors = wrld.game.input.keyboard.createCursorKeys();
        wrld.altCursors = wrld.game.input.keyboard.addKeys( { 'up': Phaser.Keyboard.W, 'down': Phaser.Keyboard.S, 'left': Phaser.Keyboard.A, 'right': Phaser.Keyboard.D } );
        
        //additional keys
        wrld.keyChange = wrld.game.input.keyboard.addKeys({'change': Phaser.Keyboard.C});
        wrld.keyUse = wrld.game.input.keyboard.addKeys({'use': Phaser.Keyboard.E});
        wrld.keyFullscreen = wrld.game.input.keyboard.addKeys({'fullscreen': Phaser.Keyboard.F11});

        //use key
        wrld.keyUse.use.onDown.add(useIt, wrld);
        wrld.keyChange.change.onDown.add(changeTexture, wrld);

        // function changeTexture() {
        //     if (this.wld.game.player.texture.baseTexture.source.name == 'player') {
        //         this.wld.game.player.loadTexture('cat', 0);
        //     } else {
        //         this.wld.game.player.loadTexture('player', 0);
        //     }
        // }
    }
    //else create touch controls 
    else { 
     //  wrld.game.input.onDown.add(wrld.scale.startFullScreen(), wrld); 
        // create our virtual game controller buttons
        wrld.upPressed = false;
        wrld.rightPressed = false;
        wrld.downPressed = false;
        wrld.leftPressed = false;
        wrld.changePressed = false;
        wrld.usePressed = false;
        wrld.w = wrld.game.width;
        wrld.h = wrld.game.height;

        let buttonUse = wrld.game.add.button(wrld.w - 80, wrld.h - 80, 'buttonUse', null, wrld, 1, 0, 1, 0);  //wrld.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
        buttonUse.fixedToCamera = true;  //our buttons should stay on the same place  
        buttonUse.events.onInputOver.add(useIt, wrld);
        buttonUse.events.onInputOut.add(function(){wrld.usePressed=false;});
        buttonUse.events.onInputDown.add(useIt, wrld);
        buttonUse.events.onInputUp.add(function(){wrld.usePressed=false;});
        
        let buttonChange = wrld.game.add.button(wrld.w - 40, 20, 'buttonChange', null, wrld, 0, 1, 0, 1);  //wrld.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
        buttonChange.alpha = 0;
        buttonChange.fixedToCamera = true;  //our buttons should stay on the same place  
        buttonChange.events.onInputOver.add(changeTexture, wrld);
        buttonChange.events.onInputOut.add(function(){wrld.changePressed=false;});
        buttonChange.events.onInputDown.add(changeTexture, wrld);
        buttonChange.events.onInputUp.add(function(){wrld.changePressed=false;});

        let buttonUpLeft = wrld.game.add.button(0, wrld.h - 96, 'button', null, wrld, 3, 0, 3, 0);
        buttonUpLeft.fixedToCamera = true;
        buttonUpLeft.events.onInputOver.add(function(){wrld.leftPressed=true;wrld.upPressed=true;});
        buttonUpLeft.events.onInputOut.add(function(){wrld.leftPressed=false;wrld.upPressed=false;});
        buttonUpLeft.events.onInputDown.add(function(){wrld.leftPressed=true;wrld.upPressed=true;});
        buttonUpLeft.events.onInputUp.add(function(){wrld.leftPressed=false;wrld.upPressed=false;});

        let buttonUp = wrld.game.add.button(32, wrld.h - 96, 'button', null, wrld, 4, 1, 4, 1);
        buttonUp.fixedToCamera = true;
        buttonUp.events.onInputOver.add(function(){wrld.upPressed=true;});
        buttonUp.events.onInputOut.add(function(){wrld.upPressed=false;});
        buttonUp.events.onInputDown.add(function(){wrld.upPressed=true;});
        buttonUp.events.onInputUp.add(function(){wrld.upPressed=false;});

        let buttonUpRight = wrld.game.add.button(64, wrld.h - 96, 'button', null, wrld, 5, 2, 5, 2);
        buttonUpRight.fixedToCamera = true;
        buttonUpRight.events.onInputOver.add(function(){wrld.rightPressed=true;wrld.upPressed=true;});
        buttonUpRight.events.onInputOut.add(function(){wrld.rightPressed=false;wrld.upPressed=false;});
        buttonUpRight.events.onInputDown.add(function(){wrld.rightPressed=true;wrld.upPressed=true;});
        buttonUpRight.events.onInputUp.add(function(){wrld.rightPressed=false;wrld.upPressed=false;});

        let buttonLeft = wrld.game.add.button(0, wrld.h - 64, 'button', null, wrld, 9, 6, 9, 6);
        buttonLeft.fixedToCamera = true;
        buttonLeft.events.onInputOver.add(function(){wrld.leftPressed=true;});
        buttonLeft.events.onInputOut.add(function(){wrld.leftPressed=false;});
        buttonLeft.events.onInputDown.add(function(){wrld.leftPressed=true;});
        buttonLeft.events.onInputUp.add(function(){wrld.leftPressed=false;});

        let buttonRight = wrld.game.add.button(64, wrld.h - 64, 'button', null, wrld, 11, 8, 11, 8);
        buttonRight.fixedToCamera = true;
        buttonRight.events.onInputOver.add(function(){wrld.rightPressed=true;});
        buttonRight.events.onInputOut.add(function(){wrld.rightPressed=false;});
        buttonRight.events.onInputDown.add(function(){wrld.rightPressed=true;});
        buttonRight.events.onInputUp.add(function(){wrld.rightPressed=false;});

        let buttonBottomLeft = wrld.game.add.button(0, wrld.h - 32, 'button', null, wrld, 15, 12, 15, 12);
        buttonBottomLeft.fixedToCamera = true;
        buttonBottomLeft.events.onInputOver.add(function(){wrld.leftPressed=true;wrld.downPressed=true;});
        buttonBottomLeft.events.onInputOut.add(function(){wrld.leftPressed=false;wrld.downPressed=false;});
        buttonBottomLeft.events.onInputDown.add(function(){wrld.leftPressed=true;wrld.downPressed=true;});
        buttonBottomLeft.events.onInputUp.add(function(){wrld.leftPressed=false;wrld.downPressed=false;});
        
        let buttonDown = wrld.game.add.button(32, wrld.h - 32, 'button', null, wrld, 16, 13, 16, 13);
        buttonDown.fixedToCamera = true;
        buttonDown.events.onInputOver.add(function(){wrld.downPressed=true;});
        buttonDown.events.onInputOut.add(function(){wrld.downPressed=false;});
        buttonDown.events.onInputDown.add(function(){wrld.downPressed=true;});
        buttonDown.events.onInputUp.add(function(){wrld.downPressed=false;});

        let buttonBottomRight = wrld.game.add.button(64, wrld.h - 32, 'button', null, wrld, 17, 14, 17, 14);
        buttonBottomRight.fixedToCamera = true;
        buttonBottomRight.events.onInputOver.add(function(){wrld.rightPressed=true;wrld.downPressed=true;});
        buttonBottomRight.events.onInputOut.add(function(){wrld.rightPressed=false;wrld.downPressed=false;});
        buttonBottomRight.events.onInputDown.add(function(){wrld.rightPressed=true;wrld.downPressed=true;});
        buttonBottomRight.events.onInputUp.add(function(){wrld.rightPressed=false;wrld.downPressed=false;});
    }

    //fullscreen mode
        let isFullScreenEnabled;
        if(document.webkitFullscreenEnabled){
           isFullScreenEnabled = document.webkitFullscreenEnabled;
        }
        else if(document.msFullscreenEnabled){ 
           isFullScreenEnabled = document.msFullscreenEnabled;
        } 
        else if (document.mozFullScreenEnabled){
           isFullScreenEnabled = document.mozFullScreenEnabled;
        }
   
        if (isFullScreenEnabled) { 
            if (wrld.game.device.desktop) {
                wrld.keyFullscreen.fullscreen.onDown.add(gofull, wrld); 
            } else {
                wrld.game.input.onDown.add(gofull, wrld);
            }
        }

        function gofull() {
            if (wrld.game.scale.isFullScreen)
            {
                wrld.game.scale.stopFullScreen();
            }
            else
            {
                wrld.game.scale.startFullScreen(false);
            }
        }
}

