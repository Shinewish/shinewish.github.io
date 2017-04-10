import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    //show loading screen
    this.game.stage.backgroundColor = '#fff';
    this.preloadBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBg')
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(2,1);
    centerGameObjects([this.preloadBg, this.preloadBar]);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    //Homescreen
    this.load.image('HomescreenBack', '../../assets/images/safe_image.jpg');
    this.load.image('goldPile', '../../assets/images/gold-coins-animated-gif.gif');

    //tiles
    this.load.tilemap('level1', '../../assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', '../../assets/images/tiles.png');
    this.load.image('darkPlace', '../../assets/images/darkPlace5.png');
    this.load.image('fog', '../../assets/images/darkPlace5.png');
    
    //player
    this.load.spritesheet('player', '../../assets/images/player.png', 14, 16, 2);
    this.load.spritesheet('cat', '../../assets/images/bat.png', 16, 12, 2);
    
    //objects
    this.load.spritesheet('key', '../../assets/images/key.png', 16, 16, 2);
    this.load.spritesheet('chest', '../../assets/images/chestGray.png', 16, 15, 2);
    this.load.image('gold', '../../assets/images/gold.png');
    this.load.image('exit', '../../assets/images/exit.png');
    this.load.image('door', '../../assets/images/door.png');

    //enemies
    this.load.spritesheet('guard', '../../assets/images/enemy.png', 16, 16, 2);
    this.load.spritesheet('bat', '../../assets/images/ghost.png', 16, 16, 2);
//    this.load.spritesheet('gorgul', '../../assets/images/gorgul.png', 15, 16, 2);
    this.load.spritesheet('enemyVision', '../../assets/images/visionEnemy.png', 40, 40, 2);
    this.load.spritesheet('enemyVision2', '../../assets/images/visionEnemy2.png', 60, 60, 2);
    this.load.spritesheet('enemyVision3', '../../assets/images/visionEnemy3.png', 72, 70, 2);
//    this.load.image('rat', '../../assets/images/rat.png');

    //gamepad buttons
    this.load.spritesheet('button', '../../assets/buttons/button.png',32,32);
    this.load.spritesheet('buttonUse', '../../assets/buttons/buttonB.png',64,64);
    this.load.spritesheet('buttonChange', '../../assets/buttons/buttonB.png',32,32);
  }

  create () {
    this.state.start('Homescreen');
  }
}
