var MyGame = MyGame || {};

//title screen
MyGame.Game = function(){};

MyGame.Game.prototype = {
  create: function() {
    this.map = this.game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles', 'gameTiles');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.backgroundlayer.alpha = 0.5;
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 200000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    //create game objects
    this.createItems();
    this.createDarkPlaces();
    this.createDoors();

    //create player
    let result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
//    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    this.player = new MyGame.Player(this, this.game, result[0].x, result[0].y, 'player');
    this.game.add.existing(this.player);

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.altCursors = this.game.input.keyboard.addKeys( { 'up': Phaser.Keyboard.W, 'down': Phaser.Keyboard.S, 'left': Phaser.Keyboard.A, 'right': Phaser.Keyboard.D } );
    this.keyChange = this.game.input.keyboard.addKeys({'change': Phaser.Keyboard.C});

    //create enemies
    this.createEnemies();
 
    this.score = 0;
    this.style = {font: '20px Arial', fill :'#ffffff'};
    this.scoreString = this.game.add.text(10, 20, 'Score:', this.style);
    this.scoreText = this.game.add.text(80, 20, '', this.style); 
    this.scoreText.fixedToCamera = true;
    this.scoreString.fixedToCamera = true;
    this.gameStyle = {font: '50px Arial', fill :'red'};
    this.gameText = this.game.add.text(80, 120, '', this.gameStyle); 
    this.gameText.fixedToCamera = true;
    this.refreshStats();   


  },
  createItems: function() {
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;
    let item;    
    result = this.findObjectsByType('item', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.items);
    }, this);
  },
    createEnemies: function() {
    //create items
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
    result = this.findObjectsByType('enemy', this.map, 'objectsLayer');
    result.forEach(function(element){
      let enemy = new MyGame.Enemy(this.game, this.player, element.x, element.y, element.properties.sprite, element.properties.path);
      this.enemies.add(enemy);
    }, this);

  },
  createDoors: function() {
    //create doors
    this.doors = this.game.add.group();
    this.doors.enableBody = true;
    result = this.findObjectsByType('door', this.map, 'objectsLayer');

    result.forEach(function(element){
      this.createFromTiledObject(element, this.doors);
    }, this);
  },  
  createDarkPlaces: function() {
    //create doors
    this.darkLayer = this.game.add.group();
    this.darkLayer.enableBody = true;
    result = this.findObjectsByType('darkPlace', this.map, 'objectsLayer');

    result.forEach(function(element){
      this.createFromTiledObject(element, this.darkLayer);
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
  },
  update: function() {
    // //player initial properties
    // this.player.alpha = 1;
    // this.player.visibility = 1;
    if (this.gameText.text != 'You WIN!') {
      this.gameText.text = ''
    };
    //collision
    this.game.physics.arcade.collide(this.player, this.blockedLayer);
    this.game.physics.arcade.collide(this.enemies, this.blockedLayer);
    //this.game.physics.arcade.overlap(this.player, this.enemies, this.collect, null, this);
    this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
    this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);
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
        if (this.game.math.distance(enemy.x, enemy.y, this.player.x, this.player.y) < 20) {
          this.isFound();
        }
      } else {
        enemy.vision.frame = 0;
        enemy.xTarg = undefined;
        enemy.yTarg = undefined;
      }
    }, this);

  },
  collect: function(player, collectable) {
    console.log('yummy!');
    this.score = this.score + 10;

    //remove sprite
    collectable.destroy();
  },
  enterDoor: function(player, door) {
    if (this.score == 100) {
      this.gameStyle.fill = 'green';
      this.gameText.text = 'You WIN!';
    }
  },
  dissapear: function(player) {
    player.isHiding = 1;
  },
  isFound: function() {
    this.gameText.text = 'Got you!';
  },
  refreshStats: function() {
      this.scoreText.text = this.score;
  },

};