var MyGame = MyGame || {};


//title screen
MyGame.Game = function(){};

MyGame.Game.prototype = {
    create: function() {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.map = this.game.add.tilemap('level1');

        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('tiles', 'gameTiles');

        //create layer
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.backgroundlayer.alpha = 0.8;
        this.blockedLayer = this.map.createLayer('blockedLayer');



        
        //collision on blockedLayer
        this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

        //resizes the game world to match the layer dimensions
        this.backgroundlayer.resizeWorld();

        //create game objects
        this.createDarkPlaces();
        this.itemTextStyle = {font: '14px Arial', fill: '#fcff00', stroke: '#412017', strokeThickness: 3};

        this.game.groups = [];
        this.createItems('chest');
        this.createItems('item');
        this.createItems('key');
        this.createDoors();
        this.createExit();

    //  fps
        this.game.time.advancedTiming = true;
        // let result = this.findObjectsByType('key', this.map, 'objectsLayer');
        // this.keyObj = this.game.add.sprite(result[0].x, result[0].y, 'keyImage', 0);
        // this.game.physics.arcade.enable(this.keyObj);        
        // this.keyObj.message = this.game.add.text(this.keyObj.x, this.keyObj.y - 15, '', this.itemTextStyle);
        // this.keyObj.message.anchor.setTo(0.5,0);
    //    this.keyObj.enableBody = true;

        //create player
        result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
    //    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
        this.player = new MyGame.Player(this, this.game, result[0].x, result[0].y, 'player');
        this.game.add.existing(this.player);
        this.game.physics.arcade.enable(this.player);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.collideWorldBounds = true;

        //the camera will follow the player in the world
        this.game.camera.follow(this.player);

        // CONTROLS BLOCK
        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.altCursors = this.game.input.keyboard.addKeys( { 'up': Phaser.Keyboard.W, 'down': Phaser.Keyboard.S, 'left': Phaser.Keyboard.A, 'right': Phaser.Keyboard.D } );
        
        //additional keys
        this.keyChange = this.game.input.keyboard.addKeys({'change': Phaser.Keyboard.C});
        this.keyUse = this.game.input.keyboard.addKeys({'use': Phaser.Keyboard.E});
        this.keyFullscreen = this.game.input.keyboard.addKeys({'fullscreen': Phaser.Keyboard.SHIFT});

        //use key
        this.keyUse.use.onDown.add(useIt, this);
        function useIt() {
            this.game.groups.forEach(function(group){
                this.game.physics.arcade.overlap(this.player, this.game[group], this.collect, null, this);
            }, this);
            let x = this.game.physics.arcade.overlap(this.player, this.game.doors, this.collect, null, this);
            this.game.doors.forEach(function(door) {
                if (this.game.math.distance(door.x, door.y, this.player.x, this.player.y) < 20) {
                    this.collect(this.player, door);
                } 
            }, this);
        }

    


    
    //fullscreen mode
        let isFullScreenEnabled;
        if(document.webkitFullscreenEnabled){
           isFullScreenEnabled = document.webkitFullscreenEnabled;
        }
        else if(document.msFullscreenEnabled){ 
           isFullScreenEnabled = document.msFullscreenEnabled;
        } 
        else if (document.mozFullScreenEnabled){
           isFullScreenEnabled = document.mozFullScreenEnabled;
        }

    //temporary block fullscreen for nondesktop    
        if (isFullScreenEnabled && this.game.device.desktop) { 
            //this.game.input.onDown.add(gofull, this);
            this.keyFullscreen.fullscreen.onDown.add(gofull, this); 
        }

        function gofull() {
            if (this.game.scale.isFullScreen)
            {
                this.game.scale.stopFullScreen();
            }
            else
            {
                this.game.scale.startFullScreen(false);
            }
        }  
        //create touch controls
        if (!this.game.device.desktop) { 
         //  this.game.input.onDown.add(this.scale.startFullScreen(), this); 
         // this.buttons = new MyGame.Buttons(this, this.game, this.player);
          //this.buttons.update =  this.buttons.prototype.update;
        //}    
            // create our virtual game controller buttons 
            this.w = this.game.width;
            this.h = this.game.height;

            buttonChange = this.game.add.button(this.w - 80, this.h - 80, 'buttonChange', null, this, 0, 1, 0, 1);  //this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
            buttonChange.fixedToCamera = true;  //our buttons should stay on the same place  
            buttonChange.events.onInputOver.add(changeTexture, this);
            buttonChange.events.onInputOut.add(function(){changePressed=false;});
            buttonChange.events.onInputDown.add(changeTexture, this);
            buttonChange.events.onInputUp.add(function(){changePressed=false;});

            function changeTexture() {
              if (this.player.texture.baseTexture.source.name == 'player') {
                this.player.loadTexture('cat', 0);
              } else {
                this.player.loadTexture('player', 0);
              }
            }

            buttonUp = this.game.add.button(32, this.h - 96, 'buttonvertical', null, this, 0, 1, 0, 1);
            buttonUp.fixedToCamera = true;
            buttonUp.events.onInputOver.add(function(){upPressed=true;});
            buttonUp.events.onInputOut.add(function(){upPressed=false;});
            buttonUp.events.onInputDown.add(function(){upPressed=true;});
            buttonUp.events.onInputUp.add(function(){upPressed=false;});

            buttonUpRight = this.game.add.button(64, this.h - 96, 'buttondiagonal', null, this, 3, 1, 3, 1);
            buttonUpRight.fixedToCamera = true;
            buttonUpRight.events.onInputOver.add(function(){rightPressed=true;upPressed=true;});
            buttonUpRight.events.onInputOut.add(function(){rightPressed=false;upPressed=false;});
            buttonUpRight.events.onInputDown.add(function(){rightPressed=true;upPressed=true;});
            buttonUpRight.events.onInputUp.add(function(){rightPressed=false;upPressed=false;});

            buttonRight = this.game.add.button(64, this.h - 64, 'buttonhorizontal', null, this, 0, 1, 0, 1);
            buttonRight.fixedToCamera = true;
            buttonRight.events.onInputOver.add(function(){rightPressed=true;});
            buttonRight.events.onInputOut.add(function(){rightPressed=false;});
            buttonRight.events.onInputDown.add(function(){rightPressed=true;});
            buttonRight.events.onInputUp.add(function(){rightPressed=false;});

            buttonBottomRight = this.game.add.button(64, this.h - 32, 'buttondiagonal', null, this, 7, 5, 7, 5);
            buttonBottomRight.fixedToCamera = true;
            buttonBottomRight.events.onInputOver.add(function(){rightPressed=true;downPressed=true;});
            buttonBottomRight.events.onInputOut.add(function(){rightPressed=false;downPressed=false;});
            buttonBottomRight.events.onInputDown.add(function(){rightPressed=true;downPressed=true;});
            buttonBottomRight.events.onInputUp.add(function(){rightPressed=false;downPressed=false;});

            buttonDown = this.game.add.button(32, this.h - 32, 'buttonvertical', null, this, 0, 1, 0, 1);
            buttonDown.fixedToCamera = true;
            buttonDown.events.onInputOver.add(function(){downPressed=true;});
            buttonDown.events.onInputOut.add(function(){downPressed=false;});
            buttonDown.events.onInputDown.add(function(){downPressed=true;});
            buttonDown.events.onInputUp.add(function(){downPressed=false;});

            buttonBottomLeft = this.game.add.button(0, this.h - 32, 'buttondiagonal', null, this, 6, 4, 6, 4);
            buttonBottomLeft.fixedToCamera = true;
            buttonBottomLeft.events.onInputOver.add(function(){leftPressed=true;downPressed=true;});
            buttonBottomLeft.events.onInputOut.add(function(){leftPressed=false;downPressed=false;});
            buttonBottomLeft.events.onInputDown.add(function(){leftPressed=true;downPressed=true;});
            buttonBottomLeft.events.onInputUp.add(function(){leftPressed=false;downPressed=false;});

            buttonLeft = this.game.add.button(0, this.h - 64, 'buttonhorizontal', null, this, 0, 1, 0, 1);
            buttonLeft.fixedToCamera = true;
            buttonLeft.events.onInputOver.add(function(){leftPressed=true;});
            buttonLeft.events.onInputOut.add(function(){leftPressed=false;});
            buttonLeft.events.onInputDown.add(function(){leftPressed=true;});
            buttonLeft.events.onInputUp.add(function(){leftPressed=false;});

            buttonUpLeft = this.game.add.button(0, this.h - 96, 'buttondiagonal', null, this, 2, 0, 2, 0);
            buttonUpLeft.fixedToCamera = true;
            buttonUpLeft.events.onInputOver.add(function(){leftPressed=true;upPressed=true;});
            buttonUpLeft.events.onInputOut.add(function(){leftPressed=false;upPressed=false;});
            buttonUpLeft.events.onInputDown.add(function(){leftPressed=true;upPressed=true;});
            buttonUpLeft.events.onInputUp.add(function(){leftPressed=false;upPressed=false;});
        }


        //create enemies
        this.createEnemies();
        
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
        this.game.timeText = this.game.add.text(10, 80, "00:00", this.style); 
        this.gameText.fixedToCamera = true;
    //    this.fpsStyle = {font: '20px Arial', fill :'green'};
    //    this.fpsText = this.game.add.text(this.game.width - 50, 20, '', this.fpsStyle); 
    //    this.fpsText.fixedToCamera = true;

        this.keyText = this.game.add.text(10, 45, 'Key: ', this.style); 
        this.keyText.fixedToCamera = true;
        this.keyIndicator = this.game.add.sprite(78, 53, 'key', 1);
        this.keyIndicator.fixedToCamera = true;
        this.keyIndicator.alpha = 0.5;

        this.refreshStats();
        this.game.startTime = this.game.time.time;
  },

  createItems: function(type) {
    //create items
    this.game.groups.unshift(type + 's');
    this.game[type + 's'] = this.game.add.group();
    this.game[type + 's'].enableBody = true;
    let result = this.findObjectsByType(type, this.map, 'objectsLayer');
    result.forEach(function(element){
        let el = this.createFromTiledObject(element, this.game[type + 's']);
        //let style = {font: '14px Arial', fill: '#fcff00', stroke: '#412017', strokeThickness: 3};
        el.message = this.game.add.text(element.x, element.y - 15, '', this.itemTextStyle);
        el.message.anchor.setTo(0.5,0);
    }, this);
  },
    createDoors: function() {
        //create items
        this.game.groups.unshift('doors');
        this.game.doors = this.game.add.group();
        this.game.doors.enableBody = true;
        let result = this.findObjectsByType('door', this.map, 'objectsLayer');
        result.forEach(function(element){
            let el = this.createFromTiledObject(element, this.game.doors);
            this.game.physics.arcade.enable(el);
            el.body.collideWorldBounds = true;
            el.body.immovable = true;
            //let style = {font: '14px Arial', fill: '#fcff00', stroke: '#412017', strokeThickness: 3};
            el.message = this.game.add.text(element.x, element.y - 15, '', this.itemTextStyle);
            el.message.anchor.setTo(0.5,0);
        }, this);
    },
  createEnemies: function() {
    //create items
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
    let result = this.findObjectsByType('enemy', this.map, 'objectsLayer');
    result.forEach(function(element){
      let enemy = new MyGame.Enemy(this.game, this.player, element.x, element.y, element.properties.sprite, element.properties.path);
      this.enemies.add(enemy);
    }, this);

  },
  createExit: function() {
    //create exits
    this.game.exits = this.game.add.group();
    this.game.exits.enableBody = true;
    let result = this.findObjectsByType('exit', this.map, 'objectsLayer');

    result.forEach(function(element){
      this.createFromTiledObject(element, this.game.exits);
    }, this);
  },  
  createDarkPlaces: function() {
    this.darkLayer = this.game.add.group();
    this.darkLayer.enableBody = true;
    this.darkLayer.alpha = 0.4;
    let result = this.findObjectsByType('darkPlace', this.map, 'darkLayer');

    result.forEach(function(element){
      let el = this.createFromTiledObject(element, this.darkLayer);
      return el;
    }, this);
  },

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    let result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  },
  //create a sprite from an object
  createFromTiledObject: function(element, group) {
    let sprite = group.create(element.x, element.y, element.properties.sprite);

      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
    return sprite;
  },

  onItem: function(player, collectable) {
    let devKey = (this.game.device.desktop) ? 'E' : 'Use';
    let typeWord = (collectable.sprite == 'chest' || collectable.sprite == 'door') ? 'open' : 'grab';
    collectable.message.text = 'Press '+ devKey + ' to ' + typeWord + ' ' + collectable.sprite;
    
  },  
  collect: function(player, collectable) {
        if (collectable.type == 'chest') {
            let inside = JSON.parse(collectable.inside);
            let sprite = this.game[inside.type + 's'].create(collectable.x, collectable.y, inside.sprite);

            //copy all properties to the sprite
            Object.keys(inside).forEach(function(key){
                sprite[key] = inside[key];
            });
            sprite.message = this.game.add.text(sprite.x, sprite.y - 15, '', this.itemTextStyle);
            sprite.message.anchor = (0.5, 0);
        } else if (collectable.type == 'key') {
            player.hasKey = 1;
        } else {        
            console.log('yummy!');
            this.score = this.score + 10;
        }
    
        //remove sprite
        collectable.message.text = '';
        collectable.destroy();
  },
  enterExit: function(player, exit) {
    if (this.player.hasKey) {
      this.state.start('Homescreen', true, false, {message:'Well done!', score: this.score, time: this.game.timeText.text});
    }
  },
  dissapear: function(player) {
    player.isHiding = 1;
  },
  isFound: function() {
    //this.gameText.text = 'Got you!';
    this.state.start('Homescreen', true, false, {message: 'Game over!', score: this.score});
  },
  refreshStats: function() {
    this.scoreText.text = this.score;
//    this.fpsText.text = 'fps: ' + this.game.time.fps;
    //player hasKey
    if (this.player.hasKey) {
        this.keyIndicator.frame = 0;
        this.keyIndicator.alpha = 1;
    }
  },
    updateTimer: function(){
        let time = this.game.time.time - this.game.startTime;
        let minutes = Math.floor(time / 60000) % 60;
        let seconds = Math.floor(time / 1000) % 60;    
        let milliseconds = Math.floor(time / 10) % 10;    

        //Display minutes, add a 0 to the start if less than 10
        let result = (minutes < 10) ? "0" + minutes : minutes; 
     
        //Display seconds, add a 0 to the start if less than 10
        result += (seconds < 10) ? ":0" + seconds : ":" + seconds; 

        //result += "." + milliseconds
        this.game.timeText.text = result;
     
    }, 

  update: function() {
    this.updateTimer();
    
//    // Messages initial properties
    if (this.gameText.text != 'You WIN!') {
      this.gameText.text = '';
    };
    
    this.game.groups.forEach(function(group){
        this.game[group].forEach(function(element){
            element.message.text = '';
        });
        this.game.physics.arcade.overlap(this.player, this.game[group], this.onItem, null, this);
    }, this);

    //collision
    this.game.physics.arcade.collide(this.player, this.blockedLayer);
    this.game.physics.arcade.collide(this.player, this.game.doors);
    this.game.physics.arcade.collide(this.enemies, this.blockedLayer);
    //this.game.physics.arcade.overlap(this.player, this.enemies, this.collect, null, this);
    //this.game.physics.arcade.overlap(this.player, this.game.keys, this.onItem, null, this);
    //this.game.physics.arcade.overlap(this.player, this.game.items, this.onItem, null, this);
    //this.game.physics.arcade.overlap(this.player, this.game.items, this.onItem, null, this);
    this.game.physics.arcade.overlap(this.player, this.game.exits, this.enterExit, null, this);
    if (this.game.physics.arcade.overlap(this.player, this.darkLayer)) {
      this.player.isHiding = 1;
    } else {
      this.player.isHiding = 0;
    };
    

    this.refreshStats();


    this.enemies.forEach(function(enemy){
      let pDirection = this.game.math.angleBetween(enemy.x, enemy.y, this.player.x, this.player.y);
      let pi2 = this.game.math.PI2;
      if (
        (
          this.game.math.distance(enemy.x, enemy.y, this.player.x, this.player.y) < (enemy.xTarg ? enemy.visRadAlert + 8 : enemy.visRad + 8)
        ) && (
          ((pDirection >= enemy.vision.rotation) && (pDirection <= (enemy.vision.rotation + enemy.lookRange * 2))) ||
          ((pDirection + pi2 >= enemy.vision.rotation) && (pDirection + pi2 <= (enemy.vision.rotation + enemy.lookRange * 2))) ||
          ((pDirection - pi2 >= enemy.vision.rotation) && (pDirection - pi2 <= (enemy.vision.rotation + enemy.lookRange * 2)))
        ) && (
          this.player.visibility == 1
        )
      ) {
        enemy.vision.frame = 1;
        enemy.xTarg = this.player.x;
        enemy.yTarg = this.player.y;
        if (this.game.math.distance(enemy.x + 8, enemy.y + 8, this.player.x, this.player.y) < 25) {
          this.isFound();
        }
      } else {
        enemy.vision.frame = 0;
        enemy.xTarg = undefined;
        enemy.yTarg = undefined;
      }
    }, this);

  
    if (!this.game.device.desktop) {
      if (upPressed) {
            this.player.body.velocity.y = -1 * this.player.speed;
            this.player.play('go');
        }
        else if (downPressed) {
            this.player.body.velocity.y = this.player.speed;
            this.player.play('go');
        }
        else {
          this.player.body.velocity.y = 0;
        }
        if (leftPressed) {
            this.player.body.velocity.x = -1 * this.player.speed;
            this.player.scale.setTo(-1, 1);
            this.player.play('go');
        }
        else if (rightPressed) {
            this.player.body.velocity.x = this.player.speed;
            this.player.scale.setTo(1, 1);
            this.player.play('go');
        } else {
            this.player.body.velocity.x = 0;
        }

        if (this.game.input.totalActivePointers == 0 || this.game.input.activePointer.isMouse) {
            changePressed = false; 
            rightPressed = false; 
            leftPressed = false; 
            downPressed = false; 
            upPressed = false;
        } //this works around a "bug" where a button gets stuck in pressed state
      }

  },

};
