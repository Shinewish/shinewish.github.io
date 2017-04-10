var MyGame = MyGame || {};

//loading the game assets
MyGame.Preload = function(){};

MyGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(2,1);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.image('HomescreenBack', 'assets/images/safe_image.jpg');
    this.load.image('goldPile', 'assets/images/gold-coins-animated-gif.gif');

    this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/images/tiles.png');
    
    this.load.spritesheet('player', 'assets/images/player.png', 14, 16, 2);
    this.load.spritesheet('cat', 'assets/images/bat.png', 16, 12, 2);
    this.load.spritesheet('key', 'assets/images/key.png', 16, 16, 2);
    this.load.spritesheet('chest', 'assets/images/chestGray.png', 16, 15, 2);

    this.load.spritesheet('guard', 'assets/images/enemy.png', 16, 16, 2);
    this.load.spritesheet('bat', 'assets/images/ghost.png', 16, 16, 2);
    this.load.spritesheet('gorgul', 'assets/images/gorgul.png', 15, 16, 2);
    this.load.spritesheet('enemyVision', 'assets/images/visionEnemy.png', 40, 40, 2);
    this.load.spritesheet('enemyVision2', 'assets/images/visionEnemy2.png', 60, 60, 2);
    this.load.spritesheet('enemyVision3', 'assets/images/visionEnemy3.png', 72, 70, 2);
    this.load.image('rat', 'assets/images/rat.png');
    this.load.image('gold', 'assets/images/gold.png');
    this.load.image('exit', 'assets/images/exit.png');
    this.load.image('door', 'assets/images/door.png');
    this.load.image('darkPlace', 'assets/images/darkPlace5.png');
    this.load.image('fog', 'assets/images/darkPlace5.png');

        //gamepad buttons
    this.load.spritesheet('button', 'assets/buttons/button.png',32,32);
    this.load.spritesheet('buttonvertical', 'assets/buttons/button-vertical.png',32,32);
    this.load.spritesheet('buttonhorizontal', 'assets/buttons/button-horizontal.png',32,32);
    this.load.spritesheet('buttondiagonal', 'assets/buttons/button-diagonal.png',32,32);
    this.load.spritesheet('buttonfire', 'assets/buttons/button-round-a.png',64,64);
    this.load.spritesheet('buttonChange', 'assets/buttons/buttonB.png',64,64);
  },
  create: function() {
    this.state.start('Homescreen');
  }
};
