var MyGame = MyGame || {};

MyGame.Player = function(wld, game, x, y, type) {
	Phaser.Sprite.call(this, game, x, y, type/*, idle frame*/);
	this.animations.add('go', [1, 0], 4, false);

	this.wld = wld;
	this.game = game;
	this.game.physics.arcade.enable(this);
	this.isHiding = 0;

	// [2,3] - animation frames
	// 4 - FPS
	// true - loop the animation
	//this.animations.add('goTop', [2, 3], 4, true);
	this.anchor.setTo(0.5);

	this.speed = 42;
	this.visibility = 1;
	this.isSeen = 0;

	this.direction = 90; //(0, 90, 180, 270)
	this.appearance = 'girl';//cat;
/*	this.getDirect = () => {
		return this.game.math.angleBetween(this.x, this.y, this.xDest, this.yDest); 
	}*/

	// vision
};

MyGame.Player.prototype = Object.create(Phaser.Sprite.prototype);
MyGame.Player.prototype.constructor = MyGame.Player;

MyGame.Player.prototype.update = function() {
	if (this.isHiding) {
		this.alpha = 0.3;
		this.visibility = 0;
	} else if (this.wld.player.texture.baseTexture.source.name == 'cat') {
		this.alpha = 1;
		this.visibility = 0;
	} else {
	    this.alpha = 1;
	    this.visibility = 1;
	}
	//player movement

	if (this.game.device.desktop) {
	    if (this.wld.cursors.up.isDown || this.wld.altCursors.up.isDown) {
	    	this.wld.player.body.velocity.y = -1 * this.wld.player.speed;
			this.play('go');
	    }
	    else if (this.wld.cursors.down.isDown || this.wld.altCursors.down.isDown) {
	      	this.wld.player.body.velocity.y = this.wld.player.speed;
			this.play('go');
	    }
	    else {
	      this.wld.player.body.velocity.y = 0;
	    }
	    if (this.wld.cursors.left.isDown || this.wld.altCursors.left.isDown) {
	      	this.wld.player.body.velocity.x = -1 * this.wld.player.speed;
			this.scale.setTo(-1, 1);
			this.play('go');
	    }
	    else if (this.wld.cursors.right.isDown || this.wld.altCursors.right.isDown) {
	      	this.wld.player.body.velocity.x = this.wld.player.speed;
			this.scale.setTo(1, 1);
			this.play('go');
	    } else {
	    	this.wld.player.body.velocity.x = 0;
	    }
	}

    this.wld.keyChange.change.onDown.add(changeTexture, this);
//    this.wld.keyChange.change.onDown.add(changeTexture, this);

    function changeTexture() {
    	if (this.wld.player.texture.baseTexture.source.name == 'player') {
    		this.wld.player.loadTexture('cat', 0);
    	} else {
    		this.wld.player.loadTexture('player', 0);
    	}
    }
};







/*
	//draw vision arc
	this.vision.x = this.x;
	this.vision.y = this.y;
	this.vision.rotation = this.getDirect() - this.game.math.PI2 / 8;
	this.vision.rotation = this.vision.rotation;

	this.setDest = () => {
		this.xDest = this.xTarg ? this.xTarg : this.xNext;
		this.yDest = this.yTarg ? this.yTarg : this.yNext;
	}
	this.setDest();

	this.xDistance = Math.round(this.xDest - this.x);
	this.yDistance = Math.round(this.yDest - this.y);
	this.dist = this.game.math.distance(this.x, this.y, this.xDest, this.yDest);

	if ((this.xDistance === 0) && (this.yDistance === 0)) {
		//this.nextPoint = (this.nextPoint === (this.path.length - 1)) ? 0 : this.nextPoint++;
		if (this.nextPoint === (this.path.length - 1)) {
			this.nextPoint = 0;
		} else {
			this.nextPoint = this.nextPoint + 1;
		}
		this.xNext = this.path[this.nextPoint][0];
		this.yNext = this.path[this.nextPoint][1];
		this.setDest();
	} else {
		this.body.velocity.x = this.game.math.max(this.speed * this.xDistance / this.dist);
		this.body.velocity.y = this.game.math.max(this.speed * this.yDistance / this.dist);
	}*/



// to add enemy to game we should write in game.create:
// var enemy = new MyGame.Enemy(this.game, x, y, "type", path);
// this.game.add.existing(enemy);