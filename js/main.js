var MyGame = MyGame || {};

let h = 240;    
let w = h * window.innerWidth / window.innerHeight;

MyGame.game = new Phaser.Game(w, h, Phaser.AUTO, '');

//var is a fix for unseen variables
if (!MyGame.game.device.desktop) {
    var upPressed = false;
    var rightPressed = false;
    var downPressed = false;
    var leftPressed = false;
    var changePressed = false; 
}

MyGame.game.state.add('Boot', MyGame.Boot);
MyGame.game.state.add('Preload', MyGame.Preload);
MyGame.game.state.add('Homescreen', MyGame.Homescreen);
MyGame.game.state.add('Game', MyGame.Game);

MyGame.game.state.start('Boot');
