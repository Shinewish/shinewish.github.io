/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../prefabs/player'
import Enemy from '../prefabs/enemy'
import { createControls } from '../funs/controls'
import { changeTexture, useIt, findObjectsByType, createFromTiledObject, createFogOfWar, createItems, createDoors, createEnemies, createExit, createDarkPlaces} from '../funs/funs'
import { onItem, collect, openDoor, enterExit, dissapear, isFound, refreshStats, updateTimer, clearFog} from '../funs/funs'




export default class extends Phaser.State {
    init () {}
    preload () {}

    create () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.map = this.game.add.tilemap('level1');

        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('tiles', 'gameTiles');

        //create layer
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.backgroundlayer.alpha = 0.8;
        this.blockedLayer = this.map.createLayer('blockedLayer');
        
        //create collision on blockedLayer
        this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

        //resizes the game world to match the layer dimensions
        this.backgroundlayer.resizeWorld();

        //create game objects
        this.itemTextStyle = {font: '14px Arial', fill: '#fcff00', stroke: '#412017', strokeThickness: 3};

        this.game.groups = [];
        createItems(this,'chest');
        createItems(this,'item');
        createItems(this,'key');

        createDarkPlaces(this);
        createDoors(this);
        createExit(this);

// debug fps activator
        //this.game.time.advancedTiming = true;

        //create enemies
        createEnemies(this);
        createFogOfWar(this);
        
        //create score
        this.score = 0;
        this.style = {font: '20px Arial', fill: '#fcff00', stroke: '#412017', strokeThickness: 3};
        this.scoreString = this.game.add.text(10, 20, 'Score:', this.style);
        this.scoreText = this.game.add.text(80, 20, '', this.style); 
        this.scoreText.fixedToCamera = true;
        this.scoreString.fixedToCamera = true;
        this.gameStyle = {font: '50px Arial', fill :'red'};
        this.gameText = this.game.add.text(80, 120, '', this.gameStyle); 
        this.gameText.fixedToCamera = true;
        this.game.timeText = this.game.add.text(this.game.width - 70, 20, "00:00", this.style); 
        this.game.timeText.fixedToCamera = true;
    //    this.fpsStyle = {font: '20px Arial', fill :'green'};
    //    this.fpsText = this.game.add.text(this.game.width - 50, 20, '', this.fpsStyle); 
    //    this.fpsText.fixedToCamera = true;

        this.keyText = this.game.add.text(10, 45, 'Key: ', this.style); 
        this.keyText.fixedToCamera = true;
        this.keyIndicator = this.game.add.sprite(78, 53, 'key', 1);
        this.keyIndicator.fixedToCamera = true;
        this.keyIndicator.alpha = 0.5;

        //this.refreshStats();
        this.game.startTime = this.game.time.time;

        //create player
        let result = findObjectsByType(this, 'playerStart', this.map, 'objectsLayer');
        this.game.player = new Player(this, this.game, result[0].x, result[0].y, 'player', result[0].properties.room);
        this.game.add.existing(this.game.player);


        //the camera will follow the player in the world
        this.game.camera.follow(this.game.player);

        this.game.openRooms = [this.game.player.room];

        //create controls
        createControls(this);
    }

    update () {
        updateTimer(this);
        clearFog(this);
        
    //    // Messages initial properties
        if (this.gameText.text != 'You WIN!') {
            this.gameText.text = '';
        };
        
        this.game.player.message1.text = '';
        this.game.player.message2.text = '';
        this.game.player.message1.x = this.game.player.x;
        this.game.player.message1.y = this.game.player.y - 30;    
        this.game.player.message2.x = this.game.player.x;
        this.game.player.message2.y = this.game.player.y - 15;
        this.game.groups.forEach(function(group) {
            // this.game[group].forEach(function(element){
            //     element.message1.text = '';
            //     element.message2.text = '';
            // });
            this.game.physics.arcade.overlap(this.game.player, this.game[group], onItem, null, this);
        }, this);

        //collision
        this.game.physics.arcade.collide(this.game.player, this.blockedLayer);
        this.game.physics.arcade.collide(this.game.player, this.game.doors);
        this.game.physics.arcade.collide(this.enemies, this.blockedLayer);
        //this.game.physics.arcade.overlap(this.game.player, this.enemies, this.collect, null, this);
        //this.game.physics.arcade.overlap(this.game.player, this.game.keys, this.onItem, null, this);
        //this.game.physics.arcade.overlap(this.game.player, this.game.items, this.onItem, null, this);
        //this.game.physics.arcade.overlap(this.game.player, this.game.items, this.onItem, null, this);
        this.game.physics.arcade.overlap(this.game.player, this.game.exits, enterExit, null, this);
        if (this.game.physics.arcade.overlap(this.game.player, this.darkLayer)) {
            this.game.player.isHiding = 1;
        } else {
            this.game.player.isHiding = 0;
        };
        
        refreshStats(this);

        this.enemies.forEach(function(enemy) {
            let pDirection = this.game.math.angleBetween(enemy.x, enemy.y, this.game.player.x, this.game.player.y);
            let pi2 = this.game.math.PI2;
            if (
                (
                  this.game.math.distance(enemy.x, enemy.y, this.game.player.x, this.game.player.y) < (enemy.xTarg ? enemy.visRadAlert + 8 : enemy.visRad + 8)
                ) && (
                  ((pDirection >= enemy.vision.rotation) && (pDirection <= (enemy.vision.rotation + enemy.lookRange * 2))) ||
                  ((pDirection + pi2 >= enemy.vision.rotation) && (pDirection + pi2 <= (enemy.vision.rotation + enemy.lookRange * 2))) ||
                  ((pDirection - pi2 >= enemy.vision.rotation) && (pDirection - pi2 <= (enemy.vision.rotation + enemy.lookRange * 2)))
                ) && (
                  this.game.player.visibility == 1
                )
            ) {
                enemy.vision.frame = 1;
                enemy.xTarg = this.game.player.x;
                enemy.yTarg = this.game.player.y;
                if (this.game.math.distance(enemy.x + 8, enemy.y + 8, this.game.player.x, this.game.player.y) < 25) {
                    isFound(this);
                }
            } else {
                enemy.vision.frame = 0;
                enemy.xTarg = undefined;
                enemy.yTarg = undefined;
            }
        }, this);
    }
}
