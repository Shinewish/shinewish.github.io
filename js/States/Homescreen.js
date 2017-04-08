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
        let scaleInd = 352 / this.game.height;
        let hMessage = 0;
        if (this.game.width < 320) {
            scaleInd = this.game.width / 340;
            hMessage = 352 * (1 - scaleInd) / 2;
        } else {
            scaleInd = 352 / this.game.height;
        };
        

        let homescreenStyle = {font: 'bold 24px Arial', fill: '#fcff00', stroke: 'black', strokeThickness: 3};
        let messageText = this.game.add.text(this.game.width / 2, hMessage + 10 * scaleInd, '', homescreenStyle);
        messageText.anchor.setTo(0.5, 0);
        messageText.scale.setTo(scaleInd);
        if (this.message) {
            messageText.text = this.message;
        };        
        
        let scoreTextBottom = messageText.bottom;
        if (!(this.score == 0)) {
            let scoreText = this.game.add.text(this.game.width / 2, 10 * scaleInd + messageText.bottom, 'Total score: ' + this.score, homescreenStyle); 
            scoreText.anchor.setTo(0.5, 0);
            scoreText.scale.setTo(scaleInd);
            scoreTextBottom = scoreText.bottom;
        };
        let mottoText = this.game.add.text(this.game.width / 2, 30 * scaleInd + scoreTextBottom, 'Hide, take and RUN!', homescreenStyle); 
        mottoText.anchor.setTo(0.5, 0);
        mottoText.scale.setTo(scaleInd);
        
        let  goldPile = this.game.add.sprite(this.game.width / 2, 10 * scaleInd + mottoText.bottom, 'goldPile');
        goldPile.scale.setTo(122 / 191 * scaleInd);
        goldPile.anchor.setTo(0.5, 0);  
        //goldPile.height = this.game.height;

        let homescreenText = this.game.add.text(this.game.width / 2, 10 * scaleInd + goldPile.bottom , 'Touch to ' + this.starter, homescreenStyle); 
        homescreenText.anchor.setTo(0.5, 0);
        homescreenText.scale.setTo(scaleInd);


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
