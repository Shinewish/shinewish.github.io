/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
    init (properties) {
        let setTimescores = (level, timescore) => {
            let n = localStorage.getItem("Timescores");
            //let n = typeof(localStorage.getItem("Timescores"));
            if (n == null) {
                this.Timescores = {
                    'level 1': '',
                    'level 2': ''
                };
                this.Timescores[level] = timescore;
            } else {
                this.Timescores = JSON.parse(localStorage.getItem("Timescores"));
                if ((this.Timescores[level] > timescore) || (this.Timescores[level] == '')) {
                    this.Timescores[level] = timescore;
                    if (this.message) {
                        this.message = this.message + '\nNew best score!\n' + level + ': ' + timescore;
                    }
                }
            }
        }

        if (properties) {
            this.message = properties.message;
            this.timescore = properties.time;
            setTimescores(properties.level, properties.time);
            this.starterText = 'restart';
        } else {
            this.timescore = '';
            setTimescores('level 1', '');
            this.starterText = 'start';
        }
        game.TimescoresT = '';
        for (let key in this.Timescores) {
            game.TimescoresT = game.TimescoresT + key + ': ' + this.Timescores[key] + '\n';
        }

        let TimescoresJSON = JSON.stringify(this.Timescores); 
        localStorage.setItem("Timescores", TimescoresJSON);
         
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
        

        let homescreenStyle = {font: 'bold 24px Arial', fill: '#fcff00', stroke: 'black', strokeThickness: 3, align: 'center'};
        let messageText = this.game.add.text(this.game.width / 2, hMessage + 10 * scaleInd, '', homescreenStyle);
        messageText.anchor.setTo(0.5, 0);
        messageText.scale.setTo(scaleInd);
        if (this.message) {
            messageText.text = this.message;
        };        
        
        let mottoText = this.game.add.text(this.game.width / 2, 30 * scaleInd + messageText.bottom, 'Hide, take and RUN!', homescreenStyle); 
        mottoText.anchor.setTo(0.5, 0);
        mottoText.scale.setTo(scaleInd);
        
        let  goldPile = this.game.add.sprite(this.game.width / 2, 10 * scaleInd + mottoText.bottom, 'goldPile');
        goldPile.scale.setTo(122 / 191 * scaleInd);
        goldPile.anchor.setTo(0.5, 0);  
        //goldPile.height = this.game.height;

        let homescreenText = this.game.add.text(this.game.width / 2, 10 * scaleInd + goldPile.bottom , this.deviceText + 'continue', homescreenStyle); 
        homescreenText.anchor.setTo(0.5, 0);
        homescreenText.scale.setTo(scaleInd);


        background.events.onInputDown.add(function() {
            this.state.start('MainMenu');
        }, this); 
    }
}
