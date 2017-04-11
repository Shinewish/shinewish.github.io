/* globals __DEV__ */
import Phaser from 'phaser'
import { clrMenu, crtBtn} from '../funs/funs'

export default class extends Phaser.State {
    init () {
        let n = localStorage.getItem("Timescores");
        if (n == null) {
            this.Timescores = {
                'level 1': '',
                'level 2': ''
            };
        } else {
            this.Timescores = JSON.parse(localStorage.getItem("Timescores"));
        }
        
        game.TimescoresT = '';
        for (let key in this.Timescores) {
            game.TimescoresT = game.TimescoresT + key + ': ' + this.Timescores[key] + '\n';
        }

        if (!this.game.device.desktop) {
            this.deviceText = 'Touch to ';
        } else {
            this.deviceText = 'Leftclick to ';
        }
    }

    preload () {}

    create () {
        let  background = this.game.add.sprite(0, 0, 'HomescreenBack');
        background.width = this.game.width;
        background.height = this.game.height;

        let fSize = ((30 / 480 * game.camera.width) < 20) ? (30 / 480 * game.camera.width) : 20;
        game.style = {font: fSize + 'px Nevis', fill: '#fcff00', stroke: '#412017', strokeThickness: 3};
// levels
        crtBtn(game, 'levels', 'LEVELS', 'greenBtn', game.camera.width / 2, (game.camera.height) / 8, 0.8, 0.5);
        game.levelsBtn.events.onInputUp.add(function () {            
            clrMenu(game);

            crtBtn(game, 'level1', 'LEVEL 1', 'greenBtn', game.camera.width / 2, (game.camera.height) / 8, 0.8, 0.5);
            game.level1Btn.events.onInputUp.add(function() {
                game.state.start('Game', true, false, 'level 1');
            });  
            crtBtn(game, 'level2', 'LEVEL 2', 'greenBtn', game.camera.width / 2, (game.camera.height) * 3 / 8, 0.8, 0.5);
            game.level2Btn.events.onInputUp.add(function() {
                game.state.start('Game', true, false, 'level 2');
            });
            // crtBtn(game, 'level3', 'LEVEL 3', 'greenBtn', game.camera.width / 2, (game.camera.height) * 5 / 8, 0.8, 0.5);
            // game.level3Btn.events.onInputUp.add(function() {
            //     game.state.start('Game', true, false, 'level 3');
            // });
            crtBtn(game, 'back', 'BACK', 'redBtn', game.camera.width / 2, (game.camera.height ) * 7 / 8, 0.8, 0.5);
            game.backBtn.events.onInputUp.add(function () {
                game.paused = false;
                game.state.start('MainMenu', true, false, {message:'', level: game.level, score: 0, time: ''});                
            });                
        });

// scoreboard 
        crtBtn(game, 'scoreboard', 'Timescores', 'yellowBtn', game.camera.width / 2, (game.camera.height) * 3 / 8, 0.8, 0.5);
        game.scoreboardBtn.events.onInputUp.add(function () {            
            clrMenu(game);
    
    
/*!!!!70!!!!*/  game.timescoreText = game.add.text(game.width / 2, (game.camera.height) / 8, 'Timescores: \n' + game.TimescoresT, game.style); 
            game.timescoreText.anchor.setTo(0.5, 0);
//        timescoreText.scale.setTo(scaleInd);
            crtBtn(game, 'back', 'BACK', 'redBtn', game.camera.width / 2, (game.camera.height) * 7 / 8, 0.8, 0.5);
            game.backBtn.events.onInputUp.add(function () {
                game.paused = false;
                game.state.start('MainMenu', true, false, {message:'', level: game.level, score: 0, time: ''});                
            });   
        });

// options
        crtBtn(game, 'options', 'OPTIONS', 'orangeBtn', game.camera.width / 2, (game.camera.height) * 5 / 8, 0.8, 0.5);
        game.optionsBtn.events.onInputUp.add(function () {
            clrMenu(game);

            // crtBtn(game, 'level1', 'LEVEL 1', 'greenBtn', game.camera.width / 2, (game.camera.height) / 8, 0.8, 0.5);
            // game.level1Btn.events.onInputUp.add(function() {
            //     game.state.start('Game', true, false, 'level 1');
            // });  

            //game.mut = false;
            if (game.soundtrack.mute) {
                crtBtn(game, 'sound', 'SOUND: OFF', 'yellowBtn', game.camera.width / 2, (game.camera.height) * 3 / 8, 0.8, 0.5);
            } else {
                crtBtn(game, 'sound', 'SOUND: ON', 'yellowBtn', game.camera.width / 2, (game.camera.height) * 3 / 8, 0.8, 0.5);
            }

            let refrSndBtn = function () {
                //sound stop
                if (!game.soundtrack.mute) {
                    //game.mut = true;
                    game.soundtrack.mute = true;
                    game.soundBtn.destroy();
                    game.soundBtnText.destroy();
                    crtBtn(game, 'sound', 'SOUND: OFF', 'yellowBtn',  game.camera.width / 2, (game.camera.height) * 3 / 8, 0.8, 0.5);
                    game.soundBtn.events.onInputUp.add(refrSndBtn, this);          
                } else {
                    // game.mut = false;
                    game.soundtrack.mute = false;
                    game.soundBtn.destroy();
                    game.soundBtnText.destroy();
                    crtBtn(game, 'sound', 'SOUND: ON', 'yellowBtn',  game.camera.width / 2, (game.camera.height) * 3 / 8, 0.8, 0.5);
                    game.soundBtn.events.onInputUp.add(refrSndBtn, this);          
                }
            }
            game.soundBtn.events.onInputUp.add(refrSndBtn, this);       

            //gender
            if ((game.gender == 'male')) {
                crtBtn(game, 'gender', 'Player: male', 'orangeBtn', game.camera.width / 2, (game.camera.height) * 5 / 8, 0.8, 0.5);
            } else {
                crtBtn(game, 'gender', 'Player: female', 'orangeBtn', game.camera.width / 2, (game.camera.height) * 5 / 8, 0.8, 0.5);
            }

            let refrSexBtn = function () {
                //sound stop
                if (!(game.gender == 'male')) {
                    game.gender = 'male';
                    game.genderBtn.destroy();
                    game.genderBtnText.destroy();
                    crtBtn(game, 'gender', 'Player: male', 'orangeBtn',  game.camera.width / 2, (game.camera.height) * 5 / 8, 0.8, 0.5);
                    game.genderBtn.events.onInputUp.add(refrSexBtn, this);          
                } else {
                    game.gender = 'female';
                    game.genderBtn.destroy();
                    game.genderBtnText.destroy();
                    crtBtn(game, 'gender', 'Player: female', 'orangeBtn',  game.camera.width / 2, (game.camera.height) * 5 / 8, 0.8, 0.5);
                    game.genderBtn.events.onInputUp.add(refrSexBtn, this);          
                }
            }
            game.genderBtn.events.onInputUp.add(refrSexBtn, this);       


            crtBtn(game, 'back', 'BACK', 'redBtn', game.camera.width / 2, (game.camera.height ) * 7 / 8, 0.8, 0.5);
            game.backBtn.events.onInputUp.add(function () {
                game.state.start('MainMenu', true, false, {message:'', level: game.level, score: 0, time: ''});                
            });                 
        });

// help
        crtBtn(game, 'about', 'ABOUT', 'redBtn', game.camera.width / 2, (game.camera.height) * 7 / 8, 0.8, 0.5);
        game.aboutBtn.events.onInputUp.add(function () {            
            clrMenu(game);
        
            game.aboutTxt = game.add.text(game.width / 2, (game.camera.height) / 16, 'The Thief\n' + 'v2.1.4\n' +' \n' + 'Made by: \n' + 'Aliaksandr Tachko', game.style); 
            game.aboutTxt.anchor.setTo(0.5, 0);
//        aboutText.scale.setTo(scaleInd);
            crtBtn(game, 'back', 'BACK', 'redBtn', game.camera.width / 2, (game.camera.height) * 7 / 8, 0.8, 0.5);
            game.backBtn.events.onInputUp.add(function () {
                game.state.start('MainMenu', true, false, {message:'', level: game.level, score: 0, time: ''});                
            });   
        });/////////////////////////////////        
  
    }
}
