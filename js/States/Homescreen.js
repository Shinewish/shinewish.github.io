var MyGame = MyGame || {};

//loading the game assets
MyGame.Homescreen = function(){};

MyGame.Homescreen.prototype = {
  
  init: function(message) {
    this.message = message;
  },

  create: function() {
    let  background = this.game.add.sprite(0, 0, 'HomescreenBack');
    background.inputEnabled = true;

    background.events.onInputDown.add(function() {
    this.state.start('Game');
    }, this);
    
    let homescreenStyle = {font: '20px Arial', fill: 'green'};
    let homescreenText = this.game.add.text(this.game.width / 2, this.game.height / 2, 'Touch to start', homescreenStyle); 
    homescreenText.anchor.setTo(0.5);

    if (this.message) {
        this.game.add.text(this.game.width / 2 - 30, 50, this.message, homescreenStyle);
    };

  }
};
