import Phaser from 'phaser'
import { clrMenu, crtBtn} from '../funs/funs'


export const pauseIt = (wrld, fSize) => {
    game = wrld.game;
    let pause = () => {
        if (game.paused) {
            game.resumeBtn.destroy();
            game.soundBtn.destroy();
            game.mMenuBtn.destroy();
            game.resumeBtnText.destroy();
            game.soundBtnText.destroy();
            game.mMenuBtnText.destroy();

            // Unpause the game
            game.paused = false;
            game.soundtrack.mute = game.mut;
        } else {
            game.mut = game.soundtrack.mute;
            game.paused = true;
    
            // Then add the menu
            crtBtn(game, 'resume', 'RESUME', 'greenBtn', game.camera.x + game.camera.width / 2, game.camera.y + game.camera.height * 2 / 7, 0.8, 0.5);
            game.resumeBtn.events.onInputUp.add(function () {            
                game.resumeBtn.destroy();
                game.soundBtn.destroy();
                game.mMenuBtn.destroy();
                game.resumeBtnText.destroy();
                game.soundBtnText.destroy();
                game.mMenuBtnText.destroy();

                // Unpause the game
                game.paused = false;
                game.soundtrack.mute = game.mut;
            });
            game.resumeBtn.input.priorityID = 100;
    
            // if (!game.soundtrack.mute) {
            // game.mut = false;
            if (game.mut) {
                crtBtn(game, 'sound', 'SOUND: OFF', 'yellowBtn', game.camera.x + game.camera.width / 2, game.camera.y + game.camera.height * 4 / 7, 0.8, 0.5);
            } else {
                crtBtn(game, 'sound', 'SOUND: ON', 'yellowBtn', game.camera.x + game.camera.width / 2, game.camera.y + game.camera.height * 4 / 7, 0.8, 0.5);
            }

            let refrSndBtn = function () {
                //sound stop
                if (!game.mut) {
                    // game.mut = true;
                    game.mut = true;
                    game.soundBtn.destroy();
                    game.soundBtnText.destroy();
                    crtBtn(game, 'sound', 'SOUND: OFF', 'yellowBtn', game.camera.x + game.camera.width / 2, game.camera.y + game.camera.height * 4 / 7, 0.8, 0.5);
                    game.soundBtn.events.onInputUp.add(refrSndBtn, this);          
                } else {
                    // game.mut = false;
                    game.mut = false;
                    game.soundBtn.destroy();
                    game.soundBtnText.destroy();
                    crtBtn(game, 'sound', 'SOUND: ON', 'yellowBtn', game.camera.x + game.camera.width / 2, game.camera.y + game.camera.height * 4 / 7, 0.8, 0.5);
                    game.soundBtn.events.onInputUp.add(refrSndBtn, this);          
                }
            }
            game.soundBtn.events.onInputUp.add(refrSndBtn, this);          
    
            crtBtn(game, 'mMenu', 'MAIN MENU', 'redBtn', game.camera.x + game.camera.width / 2, game.camera.y + game.camera.height * 6 / 7, 0.8, 0.5);
                game.mMenuBtn.events.onInputUp.add(function () {
                game.paused = false;
                game.state.start('MainMenu', true, false, {message:'', level: game.level, score: 0, time: ''});                
            });
            game.mMenuBtn.input.priorityID = 100;

        }
    }


    // Create a label to use as a button
    let pause_label;
    // if (game.device.desktop) {
    pause_label = game.add.text(game.camera.x + game.camera.width - 5, game.camera.y + fSize, 'Pause', game.style);
    // } else {
    //     pause_label = this.game.add.sprite(game.camera.width - 5, fSize, 'pauseBtn', 0);
    // }
    pause_label.fixedToCamera = true;
    pause_label.inputEnabled = true;
    pause_label.anchor.setTo(1, 0);
    pause_label.events.onInputUp.add(pause);
    if (wrld.game.device.desktop) {
        wrld.keyPause.pause.onDown.add(pause, wrld);
    }}

