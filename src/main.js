/*
Stell Paicos
Juliet Gemmell
Spencer Kim

Fish Outta Luck - 5/9/2022

Creative Tilt
I mean.. tbh it was just a struggle to get it done,
I had to do more than the programming.

The visual style was something I couldn't exactly control,
despite my attempts to guide the artists.
I did make my first ever music track though, proud(?) of that.

*/

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
let three = false;



//ui size
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;