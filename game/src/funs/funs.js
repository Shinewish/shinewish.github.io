import Phaser from 'phaser'
import Enemy from '../prefabs/enemy'

export const changeTexture = (wrld) => {
    if (wrld.game.player.texture.baseTexture.source.name == 'male') {
        wrld.game.player.loadTexture('cat', 0);
    } else if (wrld.game.player.texture.baseTexture.source.name == 'female') {
        wrld.game.player.loadTexture('cat', 0);
    } else {
        wrld.game.player.loadTexture(wrld.game.gender, 0);
    }
} 

export const useIt = (wrld) => {
    wrld.game.groups.forEach(function(group){
        wrld.game.physics.arcade.overlap(wrld.game.player, wrld.game[group], collect, null, wrld);
    }, wrld);
    let x = wrld.game.physics.arcade.overlap(wrld.game.player, wrld.game.doors, collect, null, wrld);
    wrld.game.doors.forEach(function(door) {
        if (wrld.game.math.distance(door.x, door.y, wrld.game.player.x, wrld.game.player.y) < 32) {
            openDoor(wrld, wrld.game.player, door);
        } 
    }, wrld);
}

//find objects in a Tiled layer that containt a property called "type" equal to a certain value 
export const findObjectsByType = (wrld, type, map, layer) => {
    let result = new Array();
    map.objects[layer].forEach(function(element) {
        if(element.properties.type === type) {
            element.y -= map.tileHeight;
            result.push(element);
        }      
    });
    return result;
}

//create a sprite from an object
export const createFromTiledObject = (wrld, element, group) => {
    let sprite = group.create(element.x, element.y, element.properties.sprite);
    //copy all properties to the sprite
    Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
    });
    return sprite;
}

export const createFogOfWar = (wrld) => {
    wrld.fogLayer = wrld.game.add.group();
    wrld.fogLayer.enableBody = true;
    wrld.fogLayer.alpha = 1;
    let result = findObjectsByType(wrld, 'fog', wrld.map, 'fogLayer');
    result.forEach(function(element){
      let el = createFromTiledObject(wrld, element, wrld.fogLayer);
      let z = JSON.parse(el.room);
      el.room = [];
      el.room = el.room.concat(z);
      let ar = el.room;
    }, wrld);
}

export const createItems = (wrld, type) => {
    //create items
    wrld.game.groups.unshift(type + 's');
    wrld.game[type + 's'] = wrld.game.add.group();
    wrld.game[type + 's'].enableBody = true;
    let result = findObjectsByType(wrld, type, wrld.map, 'objectsLayer');
    result.forEach(function(element){
        let el = createFromTiledObject(wrld, element, wrld.game[type + 's']);
        //let style = {font: '14px Arial', fill: '#fcff00', stroke: '#412017', strokeThickness: 3};
        el.message1 = wrld.game.add.text(element.x, element.y - 30, '', wrld.itemTextStyle);
        el.message1.anchor.setTo(0.5,0);
    }, wrld);
}

export const createDoors = (wrld) => {
    wrld.game.groups.unshift('doors');
    wrld.game.doors = wrld.game.add.group();
    wrld.game.doors.enableBody = true;
    let result = findObjectsByType(wrld, 'door', wrld.map, 'objectsLayer');
    result.forEach(function(element){
        let el = createFromTiledObject(wrld, element, wrld.game.doors);
        wrld.game.physics.arcade.enable(el);
        el.body.collideWorldBounds = true;
        el.body.immovable = true;
        //let style = {font: '14px Arial', fill: '#fcff00', stroke: '#412017', strokeThickness: 3};
        el.message1 = wrld.game.add.text(element.x, element.y - 30, '', wrld.itemTextStyle);
        el.message1.anchor.setTo(0.5,0);
    }, wrld);
}

export const createEnemies = (wrld) => {
    wrld.enemies = wrld.game.add.group();
    wrld.enemies.enableBody = true;
    let result = findObjectsByType(wrld, 'enemy', wrld.map, 'objectsLayer');
    result.forEach(function(element){
        let enemy = new Enemy(wrld.game, wrld.game.player, element.x, element.y, element.properties.sprite, element.properties.path);
        wrld.enemies.add(enemy);
    }, wrld);
}

export const createExit = (wrld) => {
    wrld.game.exits = wrld.game.add.group();
    wrld.game.exits.enableBody = true;
    let result = findObjectsByType(wrld, 'exit', wrld.map, 'objectsLayer');
    result.forEach(function(element){
        createFromTiledObject(wrld, element, wrld.game.exits);
    }, wrld);
} 

export const createDarkPlaces = (wrld) => {
    wrld.darkLayer = wrld.game.add.group();
    wrld.darkLayer.enableBody = true;
    wrld.darkLayer.alpha = 0.4;
    let result = findObjectsByType(wrld, 'darkPlace', wrld.map, 'darkLayer');
    result.forEach(function(element){
        let el = createFromTiledObject(wrld, element, wrld.darkLayer);
        return el;
    }, wrld);
}

export const onItem = (player, collectable) => {
    let wrld = player.wld;
    let devKey = (wrld.game.device.desktop) ? 'E' : 'B';
    let typeWord = (collectable.sprite == 'chest' || collectable.sprite == 'door') ? 'open' : 'grab';
    if (collectable.sprite == 'gold') {
        wrld.score = wrld.score + 10;
        //remove sprite
        // collectable.message1.text = '';
        // collectable.message2.text = '';
        collectable.destroy();
    } else {
        wrld.game.player.message1.text = 'Press '+ devKey + ' to\n' + typeWord + ' the ' + collectable.sprite;
    }
}  

export const collect = (player, collectable, wrld) => {
    if (collectable.type == 'chest') {
        let inside = JSON.parse(collectable.inside);
        let sprite = player.game[inside.type + 's'].create(collectable.x, collectable.y, inside.sprite);

        //copy all properties to the sprite
        Object.keys(inside).forEach(function(key){
            sprite[key] = inside[key];
        });
        // sprite.message1 = wrld.game.add.text(sprite.x, sprite.y - 35, '', wrld.itemTextStyle);
        // sprite.message1.anchor = (0.5, 0);
        // sprite.message2 = wrld.game.add.text(sprite.x, sprite.y - 15, '', wrld.itemTextStyle);
        // sprite.message2.anchor = (0.5, 0);
    } else if (collectable.type == 'key') {
        player.hasKey = 1;
    } else {        
        console.log('yummy!');
        wrld.score = wrld.score + 10;
    }

    //remove sprite
    // collectable.message1.text = '';
    // collectable.message2.text = '';
    collectable.destroy();
}

export const openDoor = (wrld, player, door) => {    
    let rooms = JSON.parse(door.rooms);
    rooms.forEach(function(r) {
        if (!wrld.game.openRooms.includes(r)) {
            wrld.game.openRooms.push(r);
        }
    }, wrld);

    //remove sprite
    // door.message1.text = '';
    // door.message2.text = '';
    door.destroy();
}

export const enterExit = (player, exit) => {
    let wrld = player.wld;
    if (wrld.game.player.hasKey) {
      wrld.state.start('Homescreen', true, false, {message:'Well done!', level: wrld.game.level, score: wrld.score, time: wrld.game.timeText.text});
    } else {
        wrld.game.player.message1.text = 'You have first\nto find the key!';
    }   
}

export const dissapear = (wrld, player) => {
    player.isHiding = 1;
}

export const isFound = (wrld) => {
    //wrld.gameText.text = 'Got you!';
    wrld.state.start('Homescreen', true, false, {message: 'Try again later!', level: '', score: 0, time: ''});
}

export const refreshStats = (wrld) => {
    wrld.scoreText.text = wrld.score;
    //    wrld.fpsText.text = 'fps: ' + wrld.game.time.fps;
    //player hasKey
    if (wrld.game.player.hasKey) {
        wrld.keyIndicator.frame = 0;
        wrld.keyIndicator.alpha = 1;
    }
}

export const updateTimer = (wrld) => {
    let time = wrld.game.time.time - wrld.game.startTime;
        let minutes = Math.floor(time / 60000) % 60;
        if (minutes < 60) {
            let seconds = Math.floor(time / 1000) % 60;    
            let milliseconds = Math.floor(time / 10) % 10;    
        
            //Display minutes, add a 0 to the start if less than 10
            let result = (minutes < 10) ? "0" + minutes : minutes; 
         
            //Display seconds, add a 0 to the start if less than 10
            result += (seconds < 10) ? ":0" + seconds : ":" + seconds; 
        
            //result += "." + milliseconds
            wrld.game.timeText.text = result;     
        }
}

export const clearFog = (wrld) => {
    wrld.fogLayer.forEach(function(elem) {
        elem.room.forEach(function(r) {
            if (wrld.game.openRooms.includes(r)) {
                elem.destroy();
            }                
        }, wrld)

    }, wrld);
}

export const crtBtn = (game, name, text, sprite, x, y, scaleX, scaleY) => {
    game[name + 'Btn'] = game.add.sprite(x, y, sprite);
    game[name + 'Btn'].fixedToCamera = true;
    game[name + 'Btn'].inputEnabled = true;
    game[name + 'Btn'].anchor.setTo(0.5);
    game[name + 'Btn'].scale.setTo(scaleX || 1, scaleY || 1);
    game[name + 'BtnText'] = game.add.text(x, y, text, game.style);
    game[name + 'BtnText'].fixedToCamera = true;
    game[name + 'BtnText'].anchor.setTo(0.5, 0.4);
}

export const clrMenu = (game) => {
    game.levelsBtn.destroy();
    game.scoreboardBtn.destroy();
    game.optionsBtn.destroy();
    game.aboutBtn.destroy();
    game.levelsBtnText.destroy();
    game.scoreboardBtnText.destroy();
    game.optionsBtnText.destroy();
    game.aboutBtnText.destroy();
};
