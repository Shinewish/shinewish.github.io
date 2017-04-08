var MyGame = MyGame || {};

//loading the game assets
MyGame.Homescreen = function(){};

MyGame.Homescreen.prototype = {
  
    init: function(properties) {
        if (properties) {
            this.message = properties.message;
            this.score = this.score + properties.score;
            this.starter = 'restart';
        } else {
            this.score = 0;
            this.starter = 'start';
        };
    },

    create: function() {
        let  background = this.game.add.sprite(0, 0, 'HomescreenBack');
        background.inputEnabled = true;
        background.width = this.game.width;
        background.height = this.game.height;

        

        let homescreenStyle = {font: 'bold 24px Arial', fill: 'yellow', stroke: 'black', strokeThickness: 3};
        let messageText = this.game.add.text(this.game.width / 2, 50, '', homescreenStyle);
        messageText.anchor.setTo(0.5, 0);        
        if (this.message) {
            messageText.text = this.message;
        };        

        let mottoText = this.game.add.text(this.game.width / 2, this.game.height / 2, 'Hide, take and RUN!', homescreenStyle); 
        mottoText.anchor.setTo(0.5, 0);
        
        let  goldPile = this.game.add.sprite(this.game.width / 2, this.game.width * 4 / 8 + mottoText.height, 'goldPile');
        goldPile.scale.setTo(0.5);
        goldPile.anchor.setTo(0.5, 0);  
        //goldPile.height = this.game.height;

        let homescreenText = this.game.add.text(this.game.width / 2, this.game.height / 2 + mottoText.height + goldPile.height + 10, 'Touch to ' + this.starter, homescreenStyle); 
        homescreenText.anchor.setTo(0.5, 0);

        if (!(this.score == 0)) {
            let scoreText = this.game.add.text(this.game.width / 2, 80, 'Total score: ' + this.score, homescreenStyle); 
            scoreText.anchor.setTo(0.5, 0);
        };

        background.events.onInputDown.add(function() {
        this.state.start('Game');
        }, this);    
    },
    update: function() {

//work on change scale when rotate
        // if (((window.innerWidth / window.innerHeight > 1) && (this.game.width / this.game.height < 1)) ||
        //      ((window.innerWidth / window.innerHeight < 1) && (this.game.width / this.game.height > 1))) {
        //     let h;
        //     let w;
        //     if (window.innerWidth >= window.innerHeight) {
        //         w = 360;    
        //         h = w * window.innerHeight / window.innerWidth;
        //     } else {
        //         h = 360;    
        //         w = h * window.innerWidth / window.innerHeight;
        //     }
        //     this.game.scale.setGameSize(w, h);
        // }
    },
};
