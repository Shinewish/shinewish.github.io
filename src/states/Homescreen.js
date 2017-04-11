/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
    init (properties) {
        let setScore = (level, score) => {
            let n = localStorage.getItem("scores");
            //let n = typeof(localStorage.getItem("scores"));
            if (n == null) {
                this.scores = {
                    level1: 0,
                    level2: 0
                };
                this.scores[level] = this.scores[level] + score;
            } else {
                this.scores = JSON.parse(localStorage.getItem("scores"));
                this.scores[level] = this.scores[level] + score;
            }
        }

        if (properties) {
            this.message = properties.message;
            this.score = this.score + properties.score;
            setScore(properties.level, properties.score);
            this.starterText = 'restart';
        } else {
            this.score = 0;
            setScore('level1', 0);
            this.starterText = 'start';
        }
        this.scoresT = '';
        for (let key in this.scores) {
            this.scoresT = this.scoresT + key + ': ' + this.scores[key] + '\n';
        }

        let scoresJSON = JSON.stringify(this.scores); 
        localStorage.setItem("scores", scoresJSON);
         
        if (!this.game.device.desktop) {
            this.deviceText = 'Touch to ';
        } else {
            this.deviceText = 'Leftclick to ';
        }
    }
    preload () {}

    create () {
        let  background = this.game.add.sprite(0, 0, 'HomescreenBack');
        background.inputEnabled = true;
        background.width = this.game.width;
        background.height = this.game.height;
        let scaleInd = 1;
        let hMessage = 0;
        if (this.game.width < 320) {
            scaleInd = this.game.width / 340;
            hMessage = 352 * (1 - scaleInd) / 2;
        } else if ( this.game.height / 352 < 1) {
            scaleInd = this.game.height / 352;
        };
        

        let homescreenStyle = {font: 'bold 24px Arial', fill: '#fcff00', stroke: 'black', strokeThickness: 3};
        let messageText = this.game.add.text(this.game.width / 2, hMessage + 10 * scaleInd, '', homescreenStyle);
        messageText.anchor.setTo(0.5, 0);
        messageText.scale.setTo(scaleInd);
        if (this.message) {
            messageText.text = this.message;
        };        
        
        let scoreTextBottom = messageText.bottom;
        //if (!(this.score == 0)) {
            let scoreText = this.game.add.text(this.game.width / 2, 10 * scaleInd + messageText.bottom, 'Scores: ' + this.scoresT, homescreenStyle); 
            scoreText.anchor.setTo(0.5, 0);
            scoreText.scale.setTo(scaleInd);
            scoreTextBottom = scoreText.bottom;
        //};
        let mottoText = this.game.add.text(this.game.width / 2, 30 * scaleInd + scoreTextBottom, 'Hide, take and RUN!', homescreenStyle); 
        mottoText.anchor.setTo(0.5, 0);
        mottoText.scale.setTo(scaleInd);
        
        let  goldPile = this.game.add.sprite(this.game.width / 2, 10 * scaleInd + mottoText.bottom, 'goldPile');
        goldPile.scale.setTo(122 / 191 * scaleInd);
        goldPile.anchor.setTo(0.5, 0);  
        //goldPile.height = this.game.height;

        let homescreenText = this.game.add.text(this.game.width / 2, 10 * scaleInd + goldPile.bottom , this.deviceText + this.starterText, homescreenStyle); 
        homescreenText.anchor.setTo(0.5, 0);
        homescreenText.scale.setTo(scaleInd);


        background.events.onInputDown.add(function() {
            this.state.start('Game');
        }, this);    
    }
}
