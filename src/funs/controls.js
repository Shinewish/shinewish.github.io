import Phaser from 'phaser'
import { useIt, changeTexture } from '../funs/funs'

export const createControls = (wrld) => {
    game = wrld.game;
    //create controls keys
    if (game.device.desktop) {
        //move player with cursor keys
        wrld.cursors = game.input.keyboard.createCursorKeys();
        wrld.altCursors = game.input.keyboard.addKeys( { 'up': Phaser.Keyboard.W, 'down': Phaser.Keyboard.S, 'left': Phaser.Keyboard.A, 'right': Phaser.Keyboard.D } );
        
        //additional keys
        wrld.keyChange = game.input.keyboard.addKeys({'change': Phaser.Keyboard.C});
        wrld.keyUse = game.input.keyboard.addKeys({'use': Phaser.Keyboard.E});
        wrld.keyFullscreen = game.input.keyboard.addKeys({'fullscreen': Phaser.Keyboard.F});
        wrld.keyPause = game.input.keyboard.addKeys({'pause': Phaser.Keyboard.ESC});


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
     //  game.input.onDown.add(wrld.scale.startFullScreen(), wrld); 
        // create our virtual game controller buttons
        wrld.upPressed = false;
        wrld.rightPressed = false;
        wrld.downPressed = false;
        wrld.leftPressed = false;
        wrld.changePressed = false;
        wrld.usePressed = false;
        wrld.w = game.width;
        wrld.h = game.height;

        let buttonUse = game.add.button(wrld.w - 80, wrld.h - 80, 'buttonUse', null, wrld, 1, 0, 1, 0);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
        buttonUse.fixedToCamera = true;  //our buttons should stay on the same place  
        buttonUse.events.onInputOver.add(useIt, wrld);
        buttonUse.events.onInputOut.add(function(){wrld.usePressed=false;});
        buttonUse.events.onInputDown.add(useIt, wrld);
        buttonUse.events.onInputUp.add(function(){wrld.usePressed=false;});
        
        let buttonChange = game.add.button(game.camera.width / 2, 20, 'buttonChange', null, wrld, 0, 1, 0, 1);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
        buttonChange.alpha = 0;
        buttonChange.fixedToCamera = true;  //our buttons should stay on the same place  
        buttonChange.events.onInputOver.add(changeTexture, wrld);
        buttonChange.events.onInputOut.add(function(){wrld.changePressed=false;});
        buttonChange.events.onInputDown.add(changeTexture, wrld);
        buttonChange.events.onInputUp.add(function(){wrld.changePressed=false;});

        let buttonUpLeft = game.add.button(0, wrld.h - 96, 'button', null, wrld, 3, 0, 3, 0);
        buttonUpLeft.fixedToCamera = true;
        buttonUpLeft.events.onInputOver.add(function(){wrld.leftPressed=true;wrld.upPressed=true;});
        buttonUpLeft.events.onInputOut.add(function(){wrld.leftPressed=false;wrld.upPressed=false;});
        buttonUpLeft.events.onInputDown.add(function(){wrld.leftPressed=true;wrld.upPressed=true;});
        buttonUpLeft.events.onInputUp.add(function(){wrld.leftPressed=false;wrld.upPressed=false;});

        let buttonUp = game.add.button(32, wrld.h - 96, 'button', null, wrld, 4, 1, 4, 1);
        buttonUp.fixedToCamera = true;
        buttonUp.events.onInputOver.add(function(){wrld.upPressed=true;});
        buttonUp.events.onInputOut.add(function(){wrld.upPressed=false;});
        buttonUp.events.onInputDown.add(function(){wrld.upPressed=true;});
        buttonUp.events.onInputUp.add(function(){wrld.upPressed=false;});

        let buttonUpRight = game.add.button(64, wrld.h - 96, 'button', null, wrld, 5, 2, 5, 2);
        buttonUpRight.fixedToCamera = true;
        buttonUpRight.events.onInputOver.add(function(){wrld.rightPressed=true;wrld.upPressed=true;});
        buttonUpRight.events.onInputOut.add(function(){wrld.rightPressed=false;wrld.upPressed=false;});
        buttonUpRight.events.onInputDown.add(function(){wrld.rightPressed=true;wrld.upPressed=true;});
        buttonUpRight.events.onInputUp.add(function(){wrld.rightPressed=false;wrld.upPressed=false;});

        let buttonLeft = game.add.button(0, wrld.h - 64, 'button', null, wrld, 9, 6, 9, 6);
        buttonLeft.fixedToCamera = true;
        buttonLeft.events.onInputOver.add(function(){wrld.leftPressed=true;});
        buttonLeft.events.onInputOut.add(function(){wrld.leftPressed=false;});
        buttonLeft.events.onInputDown.add(function(){wrld.leftPressed=true;});
        buttonLeft.events.onInputUp.add(function(){wrld.leftPressed=false;});

        let buttonRight = game.add.button(64, wrld.h - 64, 'button', null, wrld, 11, 8, 11, 8);
        buttonRight.fixedToCamera = true;
        buttonRight.events.onInputOver.add(function(){wrld.rightPressed=true;});
        buttonRight.events.onInputOut.add(function(){wrld.rightPressed=false;});
        buttonRight.events.onInputDown.add(function(){wrld.rightPressed=true;});
        buttonRight.events.onInputUp.add(function(){wrld.rightPressed=false;});

        let buttonBottomLeft = game.add.button(0, wrld.h - 32, 'button', null, wrld, 15, 12, 15, 12);
        buttonBottomLeft.fixedToCamera = true;
        buttonBottomLeft.events.onInputOver.add(function(){wrld.leftPressed=true;wrld.downPressed=true;});
        buttonBottomLeft.events.onInputOut.add(function(){wrld.leftPressed=false;wrld.downPressed=false;});
        buttonBottomLeft.events.onInputDown.add(function(){wrld.leftPressed=true;wrld.downPressed=true;});
        buttonBottomLeft.events.onInputUp.add(function(){wrld.leftPressed=false;wrld.downPressed=false;});
        
        let buttonDown = game.add.button(32, wrld.h - 32, 'button', null, wrld, 16, 13, 16, 13);
        buttonDown.fixedToCamera = true;
        buttonDown.events.onInputOver.add(function(){wrld.downPressed=true;});
        buttonDown.events.onInputOut.add(function(){wrld.downPressed=false;});
        buttonDown.events.onInputDown.add(function(){wrld.downPressed=true;});
        buttonDown.events.onInputUp.add(function(){wrld.downPressed=false;});

        let buttonBottomRight = game.add.button(64, wrld.h - 32, 'button', null, wrld, 17, 14, 17, 14);
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
//temporary block fullscr    
/*        if (isFullScreenEnabled) { 
            if (game.device.desktop) {
                wrld.keyFullscreen.fullscreen.onDown.add(gofull, wrld); 
            } else {
                game.input.onDown.add(gofull, wrld);
            }
        }*/

        function gofull() {
            if (game.scale.isFullScreen)
            {
                game.scale.stopFullScreen();
            }
            else
            {
                game.scale.startFullScreen(false);
            }
        }
}

