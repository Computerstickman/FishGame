let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 300,
    scene: [ Menu, Play, Tutorial],
    physics: {
        default: 'arcade',
        arcade: {debug: true}
    }
}
let controls; 
let game = new Phaser.Game(config);
//keyboard
let keyENTER, keyUP, keyDOWN;



//ui size
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;