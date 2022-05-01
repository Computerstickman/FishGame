class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('pfish', './assets/bluepinfish.png');
    }

    create(){
        //create the backgrounds 
        //create player and obstacles

        //create any ui that goes on top

        //define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

        //config animations

        this.p1Score = 0;

        // GAME OVER flag
        this.gameOver = false;

        //clock and game over function

    }


    update(){

    }


}