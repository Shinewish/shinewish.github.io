import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import PreloadState from './states/Preload'
import HomescreenState from './states/Homescreen'
import MainMenuState from './states/MainMenu'
import GameState from './states/Game'

import config from './config'

class Game extends Phaser.Game {
    constructor () {
        const docElement = document.documentElement;
        let cw = config.gameWidth;
        let ch = config.gameHeight;
        let dw = docElement.clientWidth;
        let dh = docElement.clientHeight;
        //const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth;
        //const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;
        let width = 0;
        let height = 0;
        if (dw >= dh) {
            width = cw;    
            height = width * dh / dw;
        } else {
            height = ch;    
            width = height * dw / dh;
        }

        super(width, height, Phaser.CANVAS, 'content', null);

        this.state.add('Boot', BootState, false);
        this.state.add('Preload', PreloadState, false);
        this.state.add('Homescreen', HomescreenState, false);
        this.state.add('MainMenu', MainMenuState, false);
        this.state.add('Game', GameState, false);

        this.state.start('Boot');
    }
}

window.game = new Game();
