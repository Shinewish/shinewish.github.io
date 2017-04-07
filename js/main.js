var MyGame = MyGame || {};

MyGame.game = new Phaser.Game(360, 360, Phaser.AUTO, '');

MyGame.game.state.add('Boot', MyGame.Boot);
MyGame.game.state.add('Preload', MyGame.Preload);
MyGame.game.state.add('Game', MyGame.Game);

MyGame.game.state.start('Boot');